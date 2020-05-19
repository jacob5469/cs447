import { Response, NextFunction } from "express";
import { MySqlService } from "@services/MySqlService";

export default function (mySqlService: MySqlService) {

    const operations = {
        get: get
    };

    async function get(req: Request, res: Response, next: NextFunction) {

        res.status(200).send(await mySqlService.query("SELECT description,COUNT(*) FROM VBCD GROUP BY description"));

    }

    get.apiDoc = {

        summary: 'Endpoint to request number of crimes for each description',
        operationId: 'graphCrimeDescription',
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