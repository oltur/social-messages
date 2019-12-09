"use strict";

const router = require("express").Router();
const usersRoute = require("./users-route");
const authRoute = require("./authentication-route");
const pageNotFoundRoute = require("./page-not-found-404-route")
const { indexController } = require("../controllers/index-controller");
const { ROUTES } = require("../constants/index");

router.get(ROUTES.INDEX, indexController);
router.use(ROUTES.USERS, usersRoute);
router.use(ROUTES.AUTH.INDEX, authRoute);
router.use(pageNotFoundRoute);

module.exports = router;
