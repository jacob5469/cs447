import Soda from "types/Soda";

export class SodaService {
    readonly soda: Soda = require("soda-js");
    readonly consumer = new this.soda.Consumer("data.baltimorecity.gov"); // Gets data from server
    getLatestData(latestData: any): Promise<any> {


        console.log(latestData);
        return new Promise<any>((resolve, reject) => {
            this.consumer.query().limit(10000).withDataset("wsfq-mvij").where(this.soda.expr.gt("CrimeDate", latestData.date), this.soda.expr.gt("CrimeTime", latestData.time)).getRows().on("success", function (rows: any) {
                resolve(rows);
            });
        });
    }

    async getLatestSodaData(latestData: any): Promise<{ date: string, time: string }> {
        const queryResult = (await this.getLatestData(latestData))
        return { date: queryResult[0].CrimeDate, time: queryResult[0].CrimeTime };

    }
};