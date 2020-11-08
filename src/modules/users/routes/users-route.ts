"use strict";
import { usersIndexController, registerController } from "../controllers/users-controller";
import {Router} from "express";
import { USERS_CONSTANTS } from "../constants";

const usersRoute = Router();

usersRoute.get("/", usersIndexController);

usersRoute.post(USERS_CONSTANTS.ROUTES.REGISTER, registerController);


export  {
    usersRoute,
};
