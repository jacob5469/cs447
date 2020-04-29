import { Response, NextFunction } from "express";
import { ApiRequest } from "@defs/ApiRequest";
import { MySqlService } from "@services/MySqlService";

export default function (mySqlService: MySqlService) {

    const operations = {
        post: post
    };

    // This could be a POST with easy body parameters, but maybe more annoying to document or a GET with header parameters/form-encoded
    async function post(req: ApiRequest, res: Response, next: NextFunction) {
        console.log(req.body);
        const queryResult = await mySqlService.getData(req.body);

        res.status(200).send(queryResult);

    }

    post.apiDoc = {

        summary: 'Endpoint to request crime data from',
        operationId: 'getData',
        parameters: [
            {
                in: "body",
                description: "Various filters for crime data",
                name: "CrimeFilters",
                required: false,
                schema: { $ref: "#/definitions/CrimeFilters" }
            },
        ],

        responses: {
            200: {
                description: 'Crime data requested',
                schema: {
                    type: 'object',
                }
            },
            default: {
                description: 'An error occurred',
                schema: {
                    additionalProperties: true
                }
            }
        }

    }

    return operations;
}