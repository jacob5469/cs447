import SodaConsumer from "./SodaConsumer";

/**
 * Class definition for the Socrata Open Data API (SODA).
 * More info about the API at: https://dev.socrata.com/ 
 */
export default class Soda {

    Consumer: typeof SodaConsumer;

    expr: {

        and: (...args: any) => any;
        or: (...args: any) => any;
        gt: (...args: any) => any;
        gte: (...args: any) => any;
        lt: (...args: any) => any;
        lte: (...args: any) => any;
        eq: (...args: any) => any;
    
    }

}