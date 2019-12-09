"use strict";

// TODO: Add proper logging with Winston os simmilar

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const router = require("./routes/index");
const generalConfig = require("./config/general");
const { corsMiddleware, errorHandleMiddleware } = require("./middlewares/index");

const app = express();

// limit request for a single IP
app.use(rateLimit(generalConfig));

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

// error handler
app.use(errorHandleMiddleware);

module.exports = app;
