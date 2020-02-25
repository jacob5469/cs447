import express from "express";
import "module-alias/register";
import { initialize } from "express-openapi";
import { TestService } from "@services/test";
import apiDoc from "./api/apiDoc";
import swaggerUi from "swagger-ui-express";
import SodaConsumer from "types/SodaConsumer";
import Soda from "types/Soda";

const soda: Soda = require("soda-js");

const app = express();

const router = express.Router();

const testService = new TestService();

// Create a data consumer for the baltimore city dataset 
// A Soda service will probably be created to facilitate all the soda stuff

const consumer = new soda.Consumer("data.baltimorecity.gov");

consumer.query().limit(1000000000).withDataset("wsfq-mvij").where(soda.expr.eq("CrimeTime","00:30:00"),soda.expr.eq("CrimeTime","00:30:00"))
    .getRows().on("success", function(rows: any) { 
        
        console.log(rows.length);
    
})

router.get("/base", (req, res, next) => {
    console.log("Router get called");
    next();
});

app.use(router);

const openapi = initialize({
    apiDoc: apiDoc,
    app,
    paths: "./dist/api/routes",
    routesGlob: "**/*.{ts,js}",
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
    dependencies: {
        "testService": testService
    }
});


// Setup swagger UI at /api using the doc on the openapi object

app.use("/api",swaggerUi.serve,swaggerUi.setup(openapi.apiDoc));

app.use(((err, req, res) => {
    res.status(err.status).json(err);
}) as express.ErrorRequestHandler);

app.listen(3000, () => console.log("Server listening on port 3000"));
