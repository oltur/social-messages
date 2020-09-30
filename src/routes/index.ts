"use strict";

import { Router } from "express";
import usersRoute from "./users-route";
import authRoute from "./authentication-route";
import pageNotFoundRoute from "./page-not-found-404-route";
import indexController from "../controllers/index-controller";
import { ROUTES } from "../constants/index";
import AuthenticationService from "../services/authentication-service";
import { authMiddleware } from "../middlewares";

interface AppRouterProps {
    authService: AuthenticationService;
}

const router = Router();
function appRouter({authService}: AppRouterProps) {
    router.get(ROUTES.INDEX, authMiddleware(authService), indexController);
    router.use(ROUTES.USERS, usersRoute);
    router.use(ROUTES.AUTH.INDEX, authRoute);
    router.use(pageNotFoundRoute);
    return router;
}

export default appRouter;
