import { Request } from "express";


export interface ApiRequest extends Request {

    body: {

        weapon? : string[];
        crimedate?: string[];
        crimetime? : string[];
        locations?: string[];
        descriptions?: string[];
        inside?: string[];
        districts?: string[];
        premise?: string[];

    }

}