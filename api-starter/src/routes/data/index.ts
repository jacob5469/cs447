import { Response, NextFunction } from "express";
import { ApiRequest } from "@defs/ApiRequest";
import { MySqlService } from "@services/MySqlService";

export default function (mySqlService: MySqlService) {

    const operations = {
        post: post
    };

    // This could be a POST with easy body parameters, but maybe more annoying to document or a GET with header parameters/form-encoded
    async function post(req: ApiRequest, res: Response, next: NextFunction) {

        const queryResult = await mySqlService.query("SELECT * FROM vbcd LIMIT 25");

        res.status(200).send(queryResult);

    }

    // NOTE: We could also use a YAML string here.
    post.apiDoc = {
        summary: 'Stub for crime data endpoint',
        operationId: 'getParam',
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
    };
    return operations;
}