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
        return { date: new Date(queryResult.crimedate).toISOString().split("T")[0], time: queryResult.crimetime };
    }

    // Method stub to get data from our database using the parameters of a request
    async getData(params: ApiRequest["body"]) {

    }

    async insertDataRows(data: any) {

        let insertString = "INSERT INTO `vbcd` (crimedate,crimetime,crimecode,location,description,weapon,post,district,neighborhood,longitude,latitude,total_incidents) VALUES ";

        for (let row of data) {

            insertString += "('" +
                ((row.crimedate) ? new Date(row.crimedate).toISOString().split("T")[0] : "0001-01-01") + "','" +
                (row.crimetime || "00:00:00") + "','" +
                row.crimecode + "','" +
                (row.location || "") + "','" +
                (row.description || "") + "','" +
                (row.weapon || "") + "','" +
                (row.post || "") + "','" +
                (row.district || "") + "','" +
                (row.neighborhood || "") + "'," +
                (row.longitude || "NULL") + "," +
                (row.latitude || "NULL") + "," +
                row.total_incidents +
                "),"
        }
        insertString = insertString.substring(0, insertString.length - 1);

        await this.query(insertString);

    }

}