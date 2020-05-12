import { SodaQuery } from "./SodaQuery";

export default class SodaConsumer {

    constructor(dataSite: string, sodaOpts?: any);
    
    query: () => SodaQuery;

}