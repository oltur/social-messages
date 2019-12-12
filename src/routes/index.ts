"use strict";

import { authMiddleware } from "../middlewares";
import { Router } from "express";
import usersRoute from "./users-route";
import authRoute from "./authentication-route";
import pageNotFoundRoute from "./page-not-found-404-route";
import indexController from "../controllers/index-controller";
import { ROUTES } from "../constants/index";

const router = Router();
router.get(ROUTES.INDEX, authMiddleware, indexController);
router.use(ROUTES.USERS, usersRoute);
router.use(ROUTES.AUTH.INDEX, authRoute);
router.use(pageNotFoundRoute);

export default router;
