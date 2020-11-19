import { Router } from "express";
import {addMessageController} from "../index";
import {authMiddleware} from "../../authentication";

const messagesRoute = Router();
messagesRoute.post("/", authMiddleware, addMessageController);

export {
    messagesRoute,
};
