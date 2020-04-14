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

    async getNewestData(): Promise<{ date: string, time: string }> {
        const queryResult = (await this.query("SELECT crimedate,crimetime FROM vbcd ORDER BY crimedate DESC,crimetime DESC LIMIT 1"))[0];
        if(!queryResult) return {date:"0001-01-01",time:"00:00:00"}
        return { date: new Date(queryResult.crimedate).toISOString().split("T")[0], time: queryResult.crimetime };
    }

    // Method stub to get data from our database using the parameters of a request
    async getData(params: ApiRequest["body"]) {

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