import "module-alias/register";
import { initialize } from "express-openapi";
import { MySqlService } from "@services/MySqlService";
import { SodaService } from "@services/SodaService";
import apiDoc from "./apiDoc";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

//Bring variables from the .env file that should be in the directory above this one per the README.md into the process.env
require("dotenv").config();

// This instance of MySqlService will be dependency injected into all of the routes that need it
const mySqlService = new MySqlService(process.env.DB_PASSWORD, process.env.DB_NAME);
// Used to interact with the baltimore crime database
const sodaService = new SodaService();

const app = express();

const router = express.Router();

app.use(router);

app.use(express.json());
app.use(cors());

// Attach openapi to the express server, uses the files and folders under the routes folder to organize routes
// Also attaches mySqlService onto the openapi object so it can be injected into routes that specify it as a parameter
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

// Setup swagger UI at /doc using the doc on the openapi object

app.use("/doc", swaggerUi.serve, swaggerUi.setup(openapi.apiDoc));

app.listen(3000, () => console.log("Server listening on port 3000"));

// Look for new data from the baltimore dataset and if new data found, insert it, try every 30 seconds
setInterval(async () => {

    try {

        const latestData = await mySqlService.getNewestData();
        const latestSodaData = await sodaService.getDataNewerThan(latestData);

        if (latestSodaData.length > 0) {

            await mySqlService.insertDataRows(latestSodaData);

        }

    } catch (e) {

        console.log(e);

    }

}, 30000)
