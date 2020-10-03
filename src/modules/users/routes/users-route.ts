"use strict";
import { loginController } from "../../authentication/controllers/authentication-controller";
import { usersIndexController } from "../controllers/users-controller";

const usersRoute = require("express").Router();

usersRoute.get("/", usersIndexController);

usersRoute.post("/login", loginController);

export  {
    usersRoute
};
