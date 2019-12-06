"use strict";

const cors = require("cors");

const corsMiddleware = () => {
    return cors();
};

module.exports = corsMiddleware;
