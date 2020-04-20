import express from "express";
import "module-alias/register";
import { initialize } from "express-openapi";
import { MySqlService } from "@services/MySqlService";
import { SodaService } from "@services/SodaService";
import apiDoc from "./apiDoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

require("dotenv").config();
const pw = process.env.DB_PASSWORD;
console.log(pw);

const mySqlService = new MySqlService(process.env.DB_PASSWORD, process.env.DB_NAME);
const sodaService = new SodaService();

const app = express();

const router = express.Router();

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

app.use("/doc", swaggerUi.serve, swaggerUi.setup(openapi.apiDoc));

app.listen(3000, () => console.log("Server listening on port 3000"));

setInterval(async () => {

    const latestData = await mySqlService.getNewestData();
    const latestSodaData = await sodaService.getDataNewerThan(latestData);

<<<<<<< HEAD
    // Test filters
    // 4/20: should return "... 442326 more items"
    const apiReq = {

        weapon: ["NA"],
        premise: ["Street"],
        crimedate: ["2020-04-04", "2014-01-14"],
        crimetime: ["22:00:00", "13:00:00"]
        // crimetime: string[],
        // locations: string[],
        // descriptions: string[],
        // inside: string[],
        // weapons: string[],
        // districts: string[],


    };

    const filterData = await mySqlService.getData(apiReq);

    console.log(latestData);
    console.log(filterData);
=======
    if(latestSodaData.length > 0) {
>>>>>>> c8ca852bd79a74b90297625520af573c0a87ca53

        await mySqlService.insertDataRows(latestSodaData);

    }

}, 30000)
