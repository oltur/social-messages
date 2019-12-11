"use strict";

const { ErrorHandler } = require("../utils/error-handler");
const { GLOBALS } = require("../constants/index");
const AuthenticationService  = require("../services/authentication-service");

async function isAuthenticated (request, response, next) {
    let token = request.headers[GLOBALS.AUTH_HEADER];
    const authService = new AuthenticationService();
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    try {
        request.decoded = await authService.checkToken(token);
        next();
    } catch (e) {
        next(new ErrorHandler(401, "invalid or outdated token"));
    }
}

module.exports = isAuthenticated;
