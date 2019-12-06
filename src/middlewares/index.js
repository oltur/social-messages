"use strict";

const corsMiddleware = require("./cors-middleware");
const errorHandleMiddleware = require("./error-handle-niddlware");

module.exports = {
    corsMiddleware,
    errorHandleMiddleware
};
