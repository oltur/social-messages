"use strict";

import bodyParser from "body-parser";
import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
const morgan = require('morgan');
import {generalConfig} from "../config/general";
import { corsMiddleware, errorHandleMiddleware } from "./middlewares/index";
import { router } from "./routes/index";
import {getDBInstance} from "../db/services/db.provider";

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
app.use(morgan('dev'));

// routes
app.use(router);

// error handler
app.use(errorHandleMiddleware);

const db = getDBInstance();
db.connect()
.then(() => {
    console.log('connected to database');
});

export {
    app,
};
