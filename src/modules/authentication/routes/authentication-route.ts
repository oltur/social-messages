"use strict";

import { Router } from "express";
import { ROUTES } from "../../app/constants";

const authenticationRoute = Router();

const { loginController } = require("../controllers/authentication-controller");

authenticationRoute.post(ROUTES.AUTH.LOGIN, loginController);

export  {
    authenticationRoute,
};
