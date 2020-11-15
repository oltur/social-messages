"use strict";

import { Router } from "express";
import { ROUTES } from "../../app/constants";
import {loginController} from "../controllers/authentication-controller";

const authenticationRoute = Router();

authenticationRoute.post(ROUTES.AUTH.LOGIN, loginController);

export  {
    authenticationRoute,
};
