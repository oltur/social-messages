"use strict";

const router = require("express").Router();
const ROUTES = require("../constants/routes");
const AuthService = require("../services/Auth");

const authService = new AuthService();

router.post(ROUTES.AUTH.LOGIN, async (request, response) => {
    const login = await authService.login({name: "test"});
    response.send(login);
});

module.exports = router;
