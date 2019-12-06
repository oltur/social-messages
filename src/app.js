"use strict";
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const createError = require("http-errors");
const router = require("./routes/index");

const generalConfig = require("./config/general");
const { corsMiddleware, errorHandleMiddleware } = require("./middlewares/index");

const port = process.env.PORT || 3000;
const app = express();

//limit request for a single IP
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

// catch 404 and forward to error handler
// TODO: check how to implement 404 better
app.use((req, res, next) => {
    next(createError(404));
});

app.use(errorHandleMiddleware);

app.listen(port, () => {
    console.log("Listening on ", port);
});
