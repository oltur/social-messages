"use strict";

const jwt = require("jsonwebtoken");
const util = require("util");
const { ErrorHandler } = require("../utils/error-handler");
const { GLOBALS } = require("../constants/index");
//  const fs = require("fs");
const verifyToken = util.promisify(jwt.verify);
// const readFile = util.promisify(fs.readFile);

async function isAuthenticated (request, response, next) {
    let token = request.headers[GLOBALS.AUTH_HEADER];

    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        // const sshKey = await readFile(process.env.sshKey)
        const decoded = await verifyToken(token, process.env.secret);
        request.decoded = decoded;
        next();
    } catch (e) {
        next(new ErrorHandler(401, "invalid or outdated token"));
    }
}

module.exports = isAuthenticated;
