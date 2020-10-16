import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../../common/utils/error-handler";
import {getAuthenticationServiceInstance} from "../services/authentication-service-singleton";

const authService = getAuthenticationServiceInstance();

async function loginController(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    try {
        const login = await authService.login(email, password);
        response.send(login);
    } catch (e) {
        next(new ErrorHandler(500, "Cant login", e));
    }
}

export {
    loginController,
};
