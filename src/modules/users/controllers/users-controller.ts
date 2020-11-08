import { NextFunction, Request, Response } from "express";
import { getAuthenticationServiceInstance } from "../../authentication/services/authentication-service-singleton";

function usersIndexController(request: Request, response: Response) {
    response.send("Hello user");
}

async function registerController(request: Request, response: Response, next: NextFunction) {
    const user = request.body.user;
    const auth = getAuthenticationServiceInstance();

    try {
        const created =  await auth.createUser(user);
        response.json({user: created});
    } catch (e) {
        next(e);
    }
}

export {
    usersIndexController,
    registerController,
};
