import mysql from "mysql";
import { ApiRequest } from "@defs/ApiRequest";

// Once we add options to update, maybe this will be more accurately a generalized data service?
// Mixing the task of 
export class MySqlService {

    private readonly connection: mysql.Connection;

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
    private query(query: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.connection.query(query, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });

        });

    }

    // Method stub to get the record with the latest crimetime and crimedate

<<<<<<< HEAD
    // INSERT INTO `vbcd` VALUES (1,'2020-03-28','03:00:00','3JF','4200 FALLSTAFF RD','ROBBERY - RESIDENCE','I','FIREARM','631','NORTHWEST','FALLSTAFF',-76.71127351,39.36068047,'ROW/TOWNHOUSE-OCC','',1)
    async getLatestData() : Promise<{date:string,time:string}> {
        const queryResult = (await this.query("SELECT CrimeDate,CrimeTime FROM vbcd ORDER BY CrimeDate DESC,CrimeTime DESC LIMIT 1"))[0];

        return {date: new Date(queryResult.CrimeDate).toISOString().split("T")[0], time: queryResult.CrimeTime};
    }


    // Method stub to get data from our database using the parameters of a request
    
=======
    async getNewestData(): Promise<{ date: string, time: string }> {
        const queryResult = (await this.query("SELECT crimedate,crimetime FROM vbcd ORDER BY crimedate DESC,crimetime DESC LIMIT 1"))[0];
        if(!queryResult) return {date:"0001-01-01",time:"00:00:00"}
        return { date: new Date(queryResult.crimedate).toISOString().split("T")[0], time: queryResult.crimetime };
    }

    // Method stub to get data from our database using the parameters of a request
>>>>>>> c8ca852bd79a74b90297625520af573c0a87ca53
    async getData(params: ApiRequest["body"]) {
        
        // Variables for a conditioned query
        let conditions: string = "";
        let value: string = "";

        /*
        ** Data extraction from 9 possible parameters
        ** 
        ** Order of actions: check for parameter, loop through
        ** each value, concatenate (depending on parameter)
        ** multiple times into conditions, reset value
        */

        /*
        ** Weapon
        */
        if (params.weapon) {
            params.weapon.forEach(element => {
                value += "Weapon = '" + element + "'";
            });
            value = value.replace("'W", "' OR W");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }

        /*
        ** CrimeDate
        ** Assumes only two dates are passed in a certain order
        ** Second regular expression finds an instance of "="
        */
        if (params.crimedate) {
            params.crimedate.forEach(element => {
                value += "CrimeDate = '" + element + "'";
            });
            value = value.replace('=', "<=");
            value = value.replace(/[^<]=/, " >=");
            value = value.replace("'C", "' AND C");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }

        /*
        ** CrimeTime
        ** Assumes only two times are passed in a certain order
        ** Second regular expression finds an instance of "="
        */
        if (params.crimetime) {
            params.crimetime.forEach(element => {
                value += "CrimeTime = '" + element + "'";
            });
            value = value.replace('=', "<=");
            value = value.replace(/[^<]=/, " >=");
            value = value.replace("'C", "' AND C");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }

        /*
        ** Location
        */
        if (params.locations) {
            params.locations.forEach(element => {
                value += "Location = '" + element + "'";
            });
            value = value.replace("'L", "' OR L");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }

        /*
        ** Description
        */
        if (params.descriptions) {
            params.descriptions.forEach(element => {
                value += "Description = '" + element + "'";
            });
            value = value.replace("'D", "' OR D");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }

        /*
        ** Inside
        */
        if (params.inside) {
            params.inside.forEach(element => {
                value += "Inside_Outside = '" + element + "'";
            });
            value = value.replace("'I", "' OR I");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }

        /*
        ** District
        */
        if (params.districts) {
            params.districts.forEach(element => {
                value += "District = '" + element + "'";
            });
            value = value.replace("'D", "' OR D");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }
        
        /*
        ** Premise
        */
        if (params.premise) {
            params.premise.forEach(element => {
                value += "Premise = '" + element + "'";
            });
            value = value.replace("'P", "' OR P");
            value = "asdf (" + value + ") ";
            conditions += value;
            value = "";
        }

        // Joins filters for querying
        conditions = conditions.replace("asdf", "");
        conditions = conditions.split("asdf").join("AND");

        const queryResult = (await this.query("SELECT * FROM vbcd WHERE (" + conditions + ") ORDER BY CrimeDate DESC,CrimeTime DESC"));
        //console.log(queryResult);

        return queryResult;
    }

    async insertDataRows(data: any) {

        let insertString = "INSERT INTO `vbcd` (crimedate,crimetime,crimecode,location,description,inside_outside,weapon,post,district,neighborhood,longitude,latitude,premise,total_incidents) VALUES ";

        for (const row of data) {

            for(const item of Object.keys(row)) {
                row[item] = row[item].replace(/"/g,"'");
            }

            insertString += "\n(" +
                (row.crimedate ? "\"" +new Date(row.crimedate).toISOString().split("T")[0] + "\"" : "NULL") + "," +
                (row.crimetime ? "\"" +row.crimetime +"\"" : "\"00:00:00\"") +"," +
                (row.crimecode ? "\"" + row.crimecode  + "\"" : "NULL") + "," +
                (row.location ? "\"" + row.location  + "\"" : "NULL") + "," +
                (row.description ? "\"" + row.description + "\"" : "NULL") + "," +
                (row.inside_outside ? "\"" + row.inside_outside.substring(0,1).toUpperCase() + "\"" : "NULL") + "," +
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