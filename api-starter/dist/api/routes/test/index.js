"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(testService) {
    var operations = {
        get: get
    };
    function get(req, res, next) {
        res.status(200).send(testService.testGet(req.query.param));
    }
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
    return operations;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map