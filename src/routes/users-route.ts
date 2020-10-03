"use strict";

import { loginController } from "../modules/authentication/controllers/authentication-controller";



const { usersIndexController } = require("../controllers/users-controller");
const router = require("express").Router();

router.get("/", usersIndexController);

router.post("/login", loginController);

export default router;
