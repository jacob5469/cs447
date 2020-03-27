import { Request } from "express";


export interface ApiRequest extends Request {

    body: {

        weapon? : string;
        crimedate?: string[2];
        crimetime? : string[2];
        locations?: string[];
        descriptions?: string[];
        inside?: string;
        weapons?: string[];
        districts?: string[];
        premises?: string[];

    }

}