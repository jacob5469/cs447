"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("module-alias/register");
var express_openapi_1 = require("express-openapi");
var test_1 = require("@services/test");
var apiDoc_1 = __importDefault(require("./api/apiDoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var soda = require("soda-js");
var app = express_1.default();
var router = express_1.default.Router();
var testService = new test_1.TestService();
var consumer = new soda.Consumer("data.baltimorecity.gov");
consumer.query().limit(1000000000).withDataset("wsfq-mvij").where(soda.expr.eq("CrimeTime", "00:30:00"), soda.expr.eq("CrimeTime", "00:30:00"))
    .getRows().on("success", function (rows) {
    console.log(rows.length);
});
router.get("/base", function (req, res, next) {
    console.log("Router get called");
    next();
});
app.use(router);
var openapi = express_openapi_1.initialize({
    apiDoc: apiDoc_1.default,
    app: app,
    paths: "./dist/api/routes",
    routesGlob: "**/*.{ts,js}",
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
    dependencies: {
        "testService": testService
    }
});
app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi.apiDoc));
app.use((function (err, req, res) {
    res.status(err.status).json(err);
}));
app.listen(3000, function () { return console.log("Server listening on port 3000"); });
//# sourceMappingURL=index.js.map