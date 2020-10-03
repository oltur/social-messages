import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../../common/utils/error-handler";
import { AuthenticationService } from "../services/authentication-service";


const authService = new AuthenticationService();

async function loginController (request: Request, response:Response, next: NextFunction) {
    const { user, password } = request.body;
    try {
        const login = await authService.login(user, password);
        response.send(login);
    } catch (e) {
        next(new ErrorHandler(500, "Cant login", e));
    }
}

export {
    loginController
};
