"use strict";

const router = require("express").Router();
const usersRoute = require("./users-route");
const authRoute = require("./authentication-route");
const {indexController} = require("../controllers/index-controller");
const { ROUTES } = require("../constants/index");

router.get(ROUTES.INDEX, indexController);
router.use(ROUTES.USERS, usersRoute);
router.use(ROUTES.AUTH.INDEX, authRoute);

module.exports = router;
