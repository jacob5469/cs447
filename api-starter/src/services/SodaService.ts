import Soda from "types/Soda";

export class SodaService {
    readonly soda: Soda = require("soda-js");
    readonly consumer = new this.soda.Consumer("data.baltimorecity.gov"); // Gets data from server
    getDataNewerThan(data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // "SELECT * FROM table where (crimedate = data.date and crimetime > data.time) or crimedate > data.date"
            this.consumer.query().limit(10000000000).withDataset("wsfq-mvij").where(this.soda.expr.or(this.soda.expr.and(this.soda.expr.eq("crimedate", data.date), this.soda.expr.gt("crimetime", data.time)), this.soda.expr.gt("crimedate", data.date))).order("crimedate ASC", "crimetime ASC").getRows().on("success", function (rows: any) {
                resolve(rows);
            });
        });
    }
};