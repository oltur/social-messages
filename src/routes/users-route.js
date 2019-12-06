"use strict";

const {usersIndexController} = require("../controllers/users-controller");
const router = require("express").Router();

router.get("/", usersIndexController);

module.exports = router;
