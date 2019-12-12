"use strict";

import { Router } from "express";

const router = Router();
import { ROUTES } from "../constants/index";
const { loginController } = require("../controllers/authentication-controller");

router.post(ROUTES.AUTH.LOGIN, loginController);

export default router;
