"use strict";

const router = require("express").Router();
const ROUTES = require("../constants/routes");
const { loginController } = require("../controllers/authentication-controller");

router.post(ROUTES.AUTH.LOGIN, loginController);

module.exports = router;
