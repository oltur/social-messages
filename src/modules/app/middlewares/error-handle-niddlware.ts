"use strict";

import { NextFunction, Request, Response } from "express";
import { handleError } from "../../common/utils/error-handler";

function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    handleError(error, response);
}

export default errorHandler;
