import { Request } from "express";

/**
 * TypeDef for a Request that is made to the API that contains filters on the request body
 */
export interface ApiRequest extends Request {

    body: {

        crimedate?: string[];
        crimemonth?: string[];
        crimedays?: string[];
        crimetime? : string[];
        locations?: string[];
        descriptions?: string[];
        inside?: string[];
        districts?: string[];
        neighborhoods?: string[];
        premises?: string[];
        weapons? : string[];
        [index:string]:string[]; // States that this can be indexed by a string to get a string[] 

    }

}