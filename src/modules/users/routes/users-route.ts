"use strict";
import { usersIndexController } from "../controllers/users-controller";
import {Router} from "express";

const usersRoute = Router();

usersRoute.get("/", usersIndexController);


export  {
    usersRoute
};
