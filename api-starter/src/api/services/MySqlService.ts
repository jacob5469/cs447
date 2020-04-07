import mysql from "mysql";

export class MySqlService {

    private readonly connection: mysql.Connection;

    constructor(db_password: string,db_name: string) {

        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: db_password,
            database: db_name
        });

        this.connection.connect();

    }

    query(query: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.connection.query(query, function (error, results, fields) {
                if (error) reject(error);
                console.log(results);
                resolve(results);
            });

        });

    }



}