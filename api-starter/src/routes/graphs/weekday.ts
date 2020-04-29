import { Response, NextFunction } from "express";
import { MySqlService } from "@services/MySqlService";

export default function (mySqlService: MySqlService) {

    const operations = {
        get: get
    };

    // This could be a POST with easy body parameters, but maybe more annoying to document or a GET with header parameters/form-encoded
    async function get(req: Request, res: Response, next: NextFunction) {

        res.status(200).send(await mySqlService.query("SELECT WEEKDAY(crimedate),COUNT(*) FROM VBCD GROUP BY WEEKDAY(crimedate)"));

    }

    get.apiDoc = {

        summary: 'Endpoint to request number of crimes for each day of the week',
        operationId: 'graphCrimeWeekday',
        responses: {
            200: {
                description: 'Data requested',
                schema: {
                    type: 'object',
                }
            }
        }
       
    }

    return operations;
}