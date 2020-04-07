import express from "express";
import "module-alias/register";
import { initialize } from "express-openapi";
import { MySqlService } from "@services/MySqlService";
import apiDoc from "./apiDoc";
import swaggerUi from "swagger-ui-express";
import Soda from "types/Soda";
import bodyParser from "body-parser";

require("dotenv").config();

const mySqlService = new MySqlService(process.env.DB_PASSWORD,process.env.DB_NAME);

mySqlService.query("SELECT * FROM vbcd LIMIT 2");

const soda: Soda = require("soda-js");

const app = express();

const router = express.Router();

// Create a data consumer for the baltimore city dataset 
// A Soda service will probably be created to facilitate all the soda stuff

const consumer = new soda.Consumer("data.baltimorecity.gov");

consumer.query().limit(1000000000).withDataset("wsfq-mvij").where(soda.expr.eq("CrimeTime","00:30:00"),soda.expr.eq("CrimeTime","00:30:00"))
    .getRows().on("success", function(rows: any) { 
        
        console.log(rows.length);
    
});

app.use(router);
app.use(bodyParser.json());

const openapi = initialize({
    apiDoc: apiDoc,
    app,
    paths: "./dist/routes",
    routesGlob: "**/*.{ts,js}",
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
    dependencies: {
        "mySqlService": mySqlService
    }
});


// Setup swagger UI at /api using the doc on the openapi object

app.use("/doc",swaggerUi.serve,swaggerUi.setup(openapi.apiDoc));

// app.use(((err, req, res) => {
//     res.status(err.status).json(err);
// }) as express.ErrorRequestHandler);

app.listen(3000, () => console.log("Server listening on port 3000"));
