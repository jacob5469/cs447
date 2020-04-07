import mysql from "mysql";
import SodaConsumer from "@defs/SodaConsumer";
import Soda from "@defs/Soda";
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
    query(query: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.connection.query(query, function (error, results, fields) {
                if (error) reject(error);
                console.log(results);
                resolve(results);
            });

        });

    }

    // Method stub to get the record with the latest crimetime and crimedate
    async getLatestData() : Promise<{date:string,time:string}> {

        return {} as any;
    }

    // Method stub to get data from our database using the parameters of a request

    async getData(params: ApiRequest["body"]) {

    }

}