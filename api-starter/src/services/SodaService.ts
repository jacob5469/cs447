import Soda from "types/Soda";

const soda: Soda = require("soda-js");
const consumer = new soda.Consumer("data.baltimorecity.gov"); // Gets data from server

export class SodaService {
    getLatestData(latestData: any): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            consumer.query().limit(10000).withDataset("wsfq-mvij").where(soda.expr.gt("CrimeDate", latestData.date), soda.expr.gt("CrimeTime", latestData.time)).getRows().on("success", function (rows: any) {
                resolve(rows)
            });
        });
    }

    async getLatestSodaData(latestData: any): Promise<{ date: string, time: string }> {
        const queryResult = (await this.getLatestData(latestData))
        return { date: queryResult[0].CrimeDate, time: queryResult[0].CrimeTime };

    }
};