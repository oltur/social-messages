"use strict";

const corsMiddleware = require("./cors-middleware");
const errorHandleMiddleware = require("./error-handle-niddlware");
const authMiddleware = require("./authentication-middleware");

module.exports = {
    corsMiddleware,
    authMiddleware,
    errorHandleMiddleware
};
