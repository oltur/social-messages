"use strict";
import { usersIndexController, registerController } from "../controllers/users-controller";
import {Router} from "express";

const usersRoute = Router();

usersRoute.get("/", usersIndexController);

usersRoute.post("/register", registerController);


export  {
    usersRoute,
};
