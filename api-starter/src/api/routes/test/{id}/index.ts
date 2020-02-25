import { Request, Response, NextFunction } from "express";
import { TestService } from "@services/test";

export default function (testService: TestService) {
    const operations = {
        get: get
    };

    function get(req: Request, res: Response, next: NextFunction) {
        console.log("Call swagger get");
        console.log(req.params);
        console.log(req.query);
        res.status(200).send(testService.testGet(req.params.id));
    }

    // NOTE: We could also use a YAML string here.
    get.apiDoc = {
        summary: 'Returns a message with the id you put into the path param',
        operationId: 'getParamId',
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'A message with the param in it',
                schema: {
                    type: 'object',
                    items: {
                        $ref: '#/definitions/Message'
                    }
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