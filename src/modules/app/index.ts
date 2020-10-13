"use strict";

// TODO: Add proper logging with Winston os simmilar
import bodyParser from "body-parser";
import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import logger from "morgan";
import {generalConfig} from "../config/general";
import { corsMiddleware, errorHandleMiddleware } from "./middlewares/index";
import { router } from "./routes/index";
import {pool} from "../db";

const app: Application = express();

// limit request for a single IP
app.use(rateLimit(generalConfig.rateLimiter));

// security middleware
app.use(helmet());

// cors to support multiple domains
app.use(corsMiddleware());

// get json from the request
app.use(bodyParser.json());

// beautiful access logs
app.use(logger("dev"));

// routes
app.use(router);

pool.connect().then(async (client) => {
    const time = await client.query("SELECT NOW()");
    console.log(`DB connected at ${time.rows[0].now}`);
});

// error handler
app.use(errorHandleMiddleware);

export {
    app,
};
