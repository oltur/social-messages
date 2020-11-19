"use strict";

import {Request, Response, Router} from "express";
import { AppError } from "../../common/utils/error-handler";

const router = Router();

function pageNotFoundHandler (request: Request, response: Response) {
    throw new AppError(404, "Not found");
}

// 404 page
router.use(pageNotFoundHandler);

export default router;
