"use strict";

import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error-handler";
import { GLOBALS } from "../constants/index";
import AuthenticationService from "../services/authentication-service";

function authMiddleware (authService: AuthenticationService) {
    return async function (request: Request, response: Response, next: NextFunction) {
        let token: any = request.headers[GLOBALS.AUTH_HEADER];
    
        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
            console.log(token);
        } else {
            next(new ErrorHandler(401, "No token provided"));
        }
        try {
            await authService.checkToken(token);
            next();
        } catch (e) {
            next(new ErrorHandler(401, "invalid or outdated token"));
        }
    }
}

export  {
    authMiddleware
};
