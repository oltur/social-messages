"use strict";

import { NextFunction, Request, Response } from "express";
import { GLOBALS } from "../../app/constants";
import { ErrorHandler } from "../../common/utils/error-handler";
import {getAuthenticationServiceInstance} from "../services/authentication-service-singleton";

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
        let token: any = request.headers[GLOBALS.AUTH_HEADER];
        const authService = getAuthenticationServiceInstance();
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

export  {
    authMiddleware,
};
