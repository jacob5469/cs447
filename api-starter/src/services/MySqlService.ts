import mysql from "mysql";
import { ApiRequest } from "@defs/ApiRequest";

// Once we add options to update, maybe this will be more accurately a generalized data service?
// Mixing the task of 
export class MySqlService {

    private readonly connection: mysql.Connection;
    private readonly conditionSeparator = "asdf";

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

    // Method stub to get the record with the latest crimetime and crimedate

    async getNewestData(): Promise<{ date: string, time: string }> {
        const queryResult = (await this.query("SELECT crimedate,crimetime FROM vbcd ORDER BY crimedate DESC,crimetime DESC LIMIT 1"))[0];
        if (!queryResult) return { date: "0001-01-01", time: "00:00:00" }
        return { date: new Date(queryResult.crimedate).toISOString().split("T")[0], time: queryResult.crimetime };
    }

    private orCondition(sqlField: string, params: string[]): string {

        let value = "";

        params.forEach(element => {

            value += sqlField + " = '" + element + "' OR ";

        })

        value = value.replace(/OR([^OR]*)$/, "");
        value = this.conditionSeparator + " ( " + value + ") ";

        return value;

    }

    // Method stub to get data from our database using the parameters of a request
    async getData(params: ApiRequest["body"]) {

        // No filters, get all the data
        if (!Object.keys(params).length) {

            return await this.query("SELECT * FROM VBCD ORDER BY CrimeDate DESC,CrimeTime DESC");

        }

        // Variables for a conditioned query
        let conditions: string = "";

        /*
        ** Data extraction from 9 possible parameters
        ** 
        ** Order of actions: check for parameter, loop through
        ** each value, concatenate (depending on parameter)
        ** multiple times into conditions, reset value
        */

        /*
        ** CrimeDate
        ** Assumes only two dates are passed in a certain order
        ** Second regular expression finds an instance of "="
        */
        if (params.crimedate && params.crimedate.length == 2) {
            conditions += this.conditionSeparator + " ( CrimeDate Between '" + params.crimedate[0] + "' AND '" + params.crimedate[1] + "')";
        }

        if (params.crimemonth) {

            console.log(params)

            conditions += this.conditionSeparator + " ( year(crimedate) = '" + params.crimemonth[0].split("-")[0] + "' AND month(crimedate) = '" + params.crimemonth[0].split("-")[1] +"')";

        }

        if (params.crimedays) {

            conditions += this.orCondition("WEEKDAY(CrimeDate)", params.crimedays);

        }

        /*
        ** CrimeTime
        ** Assumes only two times are passed in a certain order
        ** Second regular expression finds an instance of "="
        */
        if (params.crimetime && params.crimetime.length == 2) {
            conditions += " " + this.conditionSeparator + " ( CrimeTime Between '" + params.crimetime[0] + "' AND '" + params.crimetime[1] + "') ";
        }

        /*
        ** Location
        */
        if (params.locations) {
            conditions += this.orCondition("Location", params.locations);
        }

        /*
        ** Description
        */
        if (params.descriptions) {
            conditions += this.orCondition("Description", params.descriptions);
        }

        /*
        ** Inside
        */
        if (params.inside) {
            conditions += this.orCondition("Inside_Outside", params.inside);
        }


        /*
        ** District
        */
        if (params.districts) {
            conditions += this.orCondition("District", params.districts);
        }

        /*
       ** Neighborhood
       */
        if (params.neighborhoods) {
            conditions += this.orCondition("Neighborhood", params.neighborhoods);
        }

        /*
        ** Premise
        */
        if (params.premises) {
            conditions += this.orCondition("Premise", params.premises);
        }

        /*
        ** Weapon
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

    async insertDataRows(data: any) {

        let insertString = "INSERT INTO `vbcd` (crimedate,crimetime,crimecode,location,description,inside_outside,weapon,post,district,neighborhood,longitude,latitude,premise,total_incidents) VALUES ";

        for (const row of data) {

            for (const item of Object.keys(row)) {
                row[item] = row[item].replace(/"/g, "'");
            }

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