"use strict";

import { NextFunction, Request, Response } from "express";
import {getAuthenticationServiceInstance} from "../services/authentication-service.provider";

const authService = getAuthenticationServiceInstance();

async function loginController(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    try {
        const token = await authService.login(email, password);
        response.status(200).json({token});
    } catch (e) {
        next(e);
    }
}

export {
    loginController,
};
