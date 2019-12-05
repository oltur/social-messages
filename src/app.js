"use strict";
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const logger = require("morgan");
const router = require("./routes/index");
const { corsMiddleware, errorHandleMiddleware } = require("./middlewares/index");
const createError = require("http-errors");

const port = process.env.PORT || 3000;
const app = express();

// security middleware
app.use(helmet());
app.use(corsMiddleware());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(router);

// catch 404 and forward to error handler
// TODO: check hot to implement 404 better
app.use((req, res, next) => {
    next(createError(404));
});

app.use(errorHandleMiddleware);

app.listen(port, () => {
    console.log("Listening on ", port);
});
