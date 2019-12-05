"use strict";

const router = require("express").Router();
const usersRoute = require("./users");
const authRoute = require("./auth");
const { ROUTES } = require("../constants/index");

router.get("/", (request, response) => {
    response.send("Hello world");
});

router.use(ROUTES.USERS, usersRoute);
router.use(ROUTES.AUTH.INDEX, authRoute);

module.exports = router;
