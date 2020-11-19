"use strict";

import { usersIndexController, registerController } from "../controllers/register.controller";
import {Router} from "express";
import { USERS_CONSTANTS } from "../constants";
import {followController, unFollowController} from "../controllers/follow.controller";
import { authMiddleware } from "../../authentication";

const usersRoute = Router();

usersRoute.get("/", usersIndexController);

usersRoute.post(USERS_CONSTANTS.ROUTES.REGISTER, registerController);
usersRoute.post(USERS_CONSTANTS.ROUTES.FOLLOW, authMiddleware, followController);
usersRoute.post(USERS_CONSTANTS.ROUTES.UN_FOLLOW, authMiddleware, unFollowController);

export {
    usersRoute,
};
