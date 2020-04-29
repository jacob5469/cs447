import { Request } from "express";


export interface ApiRequest extends Request {

    body: {
        crimedate?: string[];
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