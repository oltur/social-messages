"use strict";

import { handleError, AppError } from "./error-handler";
import { Response } from "express";

describe("ErrorHandler", () => {

    const req = {} as Response;
    req.status = jest.fn().mockImplementation(() => req);
    req.send = jest.fn().mockImplementation(() => req);
    req.json = jest.fn().mockImplementation(() => req);

    it("should handle error", () => {
        const error = new AppError(401, "Some error");
        handleError(error, req);
        expect(req.status).toHaveBeenLastCalledWith(401);
        expect(req.json).toHaveBeenLastCalledWith({
            statusCode: 401,
            status: "error",
            message: "Some error",
        })
    });
});
