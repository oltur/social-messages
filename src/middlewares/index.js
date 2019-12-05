"use strict";

const corsMiddleware = require("./cors");
const errorHandleMiddleware = require("./error-handle");

module.exports = {
    corsMiddleware,
    errorHandleMiddleware
};
