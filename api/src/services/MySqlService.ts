import mysql from "mysql";
import { ApiRequest } from "@defs/ApiRequest";


/**
 * Service class that handles much of the more complicated logic of communicating with the backend SQL database
 */
export class MySqlService {

    private readonly connection: mysql.Connection;
    private readonly conditionSeparator = "asdf";

    /**
     * Create a MySqlService instance with a certain database password and database name
     * Assumes that the user is root and host is localhost
     * @param db_password password for the database
     * @param db_name name of the database
     */
    constructor(db_password: string, db_name: string) {

        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: db_password,
            database: db_name
        });

        this.connection.connect();

    }

    /**
     * Takes in a SQL query as a string and returns a promise.
     * Promise resolves when query results come back, 
     * rejects if a error comes back
     * @param query A mySQL query as a String
     */
    // TODO Make method private once getLatestData and getData are fully implemented
    query(query: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.connection.query(query, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });

        });

    }

    /**
     * Get record with the most recent date and time from the database
     */
    async getNewestData(): Promise<{ date: string, time: string }> {
        const queryResult = (await this.query("SELECT crimedate,crimetime FROM vbcd ORDER BY crimedate DESC,crimetime DESC LIMIT 1"))[0];
        if (!queryResult) return { date: "0001-01-01", time: "00:00:00" }
        return { date: new Date(queryResult.crimedate).toISOString().split("T")[0], time: queryResult.crimetime };
    }

    /**
     * Creates a long OR condition where the sqlField could be equal to any item inside of params
     * @param sqlField SqlField to check equality in the or conditions
     * @param params values to check sql field against in the or conditions
     */
    private orCondition(sqlField: string, params: string[]): string {

        let value = "";

        params.forEach(element => {

            value += sqlField + " = '" + element + "' OR ";

        })

        value = value.replace(/OR([^OR]*)$/, "");
        value = this.conditionSeparator + " ( " + value + ") ";

        return value;

    }

    /**
     * Gets data from the SQL database when provided with a number of filters
     * @param params Filters for the SQL query
     */
    async getData(params: ApiRequest["body"]) {

        // No filters, get all the data
        if (!Object.keys(params).length) {

            return await this.query("SELECT * FROM VBCD ORDER BY CrimeDate DESC,CrimeTime DESC");

        }

        // Variables for a conditioned query
        let conditions: string = "";

        /*
        ** CrimeDate range filter where date between first and second filter value
        */
        if (params.crimedate && params.crimedate.length == 2) {
            conditions += this.conditionSeparator + " ( CrimeDate Between '" + params.crimedate[0] + "' AND '" + params.crimedate[1] + "')";
        }

        /**
         * Month number filter(0-11)
         * Only does filter for one selected month
         */
        if (params.crimemonth) {

            conditions += this.conditionSeparator + " ( year(crimedate) = '" + params.crimemonth[0].split("-")[0] + "' AND month(crimedate) = '" + params.crimemonth[0].split("-")[1] + "')";

        }

        /**
         * CrimeDay, where crimedays are some day(s) of the week(0-7)
         */
        if (params.crimedays) {

            conditions += this.orCondition("WEEKDAY(CrimeDate)", params.crimedays);

        }

        /*
        ** CrimeTime
        ** Assumes only two times are passed in increasing order
        */
        if (params.crimetime && params.crimetime.length == 2) {
            conditions += " " + this.conditionSeparator + " ( CrimeTime Between '" + params.crimetime[0] + "' AND '" + params.crimetime[1] + "') ";
        }

        /*
        ** Location(s)
        */
        if (params.locations) {
            conditions += this.orCondition("Location", params.locations);
        }

        /*
        ** Description(s)
        */
        if (params.descriptions) {
            conditions += this.orCondition("Description", params.descriptions);
        }

        /*
        ** Inside/Outside filter, where inside and outside are either I or O
        */
        if (params.inside) {
            conditions += this.orCondition("Inside_Outside", params.inside);
        }


        /*
        ** District(s)
        */
        if (params.districts) {
            conditions += this.orCondition("District", params.districts);
        }

        /*
       ** Neighborhood(s)
       */
        if (params.neighborhoods) {
            conditions += this.orCondition("Neighborhood", params.neighborhoods);
        }

        /*
        ** Premise(s)
        */
        if (params.premises) {
            conditions += this.orCondition("Premise", params.premises);
        }

        /*
        ** Weapon(s)
        */
        if (params.weapons) {
            conditions += this.orCondition("Weapon", params.weapons);
        }

        // Joins filters for querying
        conditions = conditions.replace(this.conditionSeparator, "");
        conditions = conditions.split(this.conditionSeparator).join("AND");

        const query = "SELECT * FROM vbcd WHERE (" + conditions + ") ORDER BY CrimeDate DESC,CrimeTime DESC";

        const queryResult = (await this.query(query));

        return queryResult;

    }

    /**
     * Inserts new data rows into the database in large batches
     * @param data new data rows
     */
    async insertDataRows(data: any[]) {

        let insertString = "INSERT INTO `vbcd` (crimedate,crimetime,crimecode,location,description,inside_outside,weapon,post,district,neighborhood,longitude,latitude,premise,total_incidents) VALUES ";

        for (const row of data) {

            // Replace any and all double quotes with single, they mess with the query
            for (const item of Object.keys(row)) {
                row[item] = row[item].replace(/"/g, "'");
            }

            // perform checks for presence of each row item, set to default value if not present
            insertString += "\n(" +
                (row.crimedate ? "\"" + new Date(row.crimedate).toISOString().split("T")[0] + "\"" : "NULL") + "," +
                (row.crimetime ? "\"" + row.crimetime + "\"" : "\"00:00:00\"") + "," +
                (row.crimecode ? "\"" + row.crimecode + "\"" : "NULL") + "," +
                (row.location ? "\"" + row.location + "\"" : "NULL") + "," +
                (row.description ? "\"" + row.description + "\"" : "NULL") + "," +
                (row.inside_outside ? "\"" + row.inside_outside.substring(0, 1).toUpperCase() + "\"" : "NULL") + "," +
                (row.weapon ? "\"" + row.weapon + "\"" : "NULL") + "," +
                (row.post ? "\"" + row.post + "\"" : "NULL") + "," +
                (row.district ? "\"" + row.district + "\"" : "NULL") + "," +
                (row.neighborhood ? "\"" + row.neighborhood + "\"" : "NULL") + "," +
                (row.longitude || "NULL") + "," +
                (row.latitude || "NULL") + "," +
                (row.premise ? "\"" + row.premise + "\"" : "NULL") + "," +
                row.total_incidents +
                "),"
        }

        insertString = insertString.substring(0, insertString.length - 1);
        await this.query(insertString);

    }

}