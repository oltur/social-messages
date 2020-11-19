"use strict";

import { NextFunction, Request, Response } from "express";
import {UserService} from "../services/user.service";

function usersIndexController(request: Request, response: Response) {
    response.send("Hello user");
}

async function registerController(request: Request, response: Response, next: NextFunction): Promise<void> {
    const user = request.body.user;
    const userService = new UserService();

    try {
        const created =  await userService.createUser(user);
        response.status(201).json({user: created});
    } catch (e) {
        next(e);
    }
}

export {
    usersIndexController,
    registerController,
};
