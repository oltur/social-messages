"use strict";

import { NextFunction, Request, Response } from "express";

import { ErrorHandler } from "../utils/error-handler";
import { GLOBALS } from "../constants/index";
import AuthenticationService from "../services/authentication-service";

async function isAuthenticated (request: Request, response: Response, next: NextFunction) {
    let token: any = request.headers[GLOBALS.AUTH_HEADER];
    const authService = new AuthenticationService();
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    try {
        await authService.checkToken(token);
        next();
    } catch (e) {
        next(new ErrorHandler(401, "invalid or outdated token"));
    }
}

export default isAuthenticated;
