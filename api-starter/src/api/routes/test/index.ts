import { Response, NextFunction } from "express";
import { ApiRequest } from "../../../types/ApiRequest";
import { TestService } from "@services/test";

export default function (testService: TestService) {
    
    const operations = {
        get: get,
        post : post
    };

    function get(req: ApiRequest, res: Response, next: NextFunction) {

        res.status(200).send(testService.testGet(req.query.param));
        
    }
    function post(req: ApiRequest, res: Response, next: NextFunction) {

        console.log(req.body.crimetime)

        res.status(200).send(testService.testGet(req.query.param));

    }

    // NOTE: We could also use a YAML string here.
    get.apiDoc = {
        summary: 'Returns a message with the string you put into the param',
        operationId: 'getParam',
        parameters: [
            {
                in: 'query',
                name: 'param',
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
    // post.apiDoc = {
    //     summary: 'Returns a message with the string you put into the param',
    //     operationId: 'getParam2'
    // };

    return operations;
}