"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(testService) {
    var operations = {
        get: get
    };
    function get(req, res, next) {
        console.log("Call swagger get");
        console.log(req.params);
        console.log(req.query);
        res.status(200).send(testService.testGet(req.params.id));
    }
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
exports.default = default_1;
//# sourceMappingURL=index.js.map