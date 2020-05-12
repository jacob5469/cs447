import express from "express";
import "module-alias/register";
import { initialize } from "express-openapi";
import { MySqlService } from "@services/MySqlService";
import { SodaService } from "@services/SodaService";
import cors from "cors";
import apiDoc from "./apiDoc";
import swaggerUi from "swagger-ui-express";

require("dotenv").config();

const mySqlService = new MySqlService(process.env.DB_PASSWORD, process.env.DB_NAME);
const sodaService = new SodaService();

const app = express();

const router = express.Router();

app.use(router);

app.use(express.json());
app.use(cors());

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