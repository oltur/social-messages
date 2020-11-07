import { Request, Response } from "express";
import { getAuthenticationServiceInstance } from "../../authentication/services/authentication-service-singleton";

function usersIndexController(request: Request, response: Response) {
    response.send("Hello user");
}

async function registerController(request: Request, response: Response) {
    const user = request.body.user;
    const auth = getAuthenticationServiceInstance();
    const created =  await auth.createUser(user);
    return response.json({user: created});
}

export {
    usersIndexController,
    registerController,
};
