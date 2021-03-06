import Soda from "types/Soda";

/**
 * Performs business logic of communicating with the baltimore crime dataset
 */
export class SodaService {
    readonly soda: Soda = require("soda-js");
    readonly consumer = new this.soda.Consumer("data.baltimorecity.gov"); // Gets data from server
    
    /**
     * Get data from the baltimore dataset that is new than a specific date and time
     * @param data A Object containing a date and time string attribute
     */
    async getDataNewerThan(data: { date: string, time: string }): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // "SELECT * FROM table where (crimedate = data.date and crimetime > data.time) or crimedate > data.date"
            this.consumer.query().limit(10000).withDataset("wsfq-mvij").where(this.soda.expr.or(this.soda.expr.and(this.soda.expr.eq("crimedate", data.date), this.soda.expr.gt("crimetime", data.time)), this.soda.expr.gt("crimedate", data.date))).order("crimedate ASC", "crimetime ASC").getRows().on("success", function (rows: any) {
                resolve(rows);
            });
        });
    }
};