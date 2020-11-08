"use strict";

import { Response } from "express";

class AppError extends Error {
    constructor(public statusCode: number, public message: string, public details: any = null) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
    }
}

function handleError(error: any, response: Response) {
    const { statusCode, message, details } = error;
    console.error(details);
    return response.status(statusCode || 500).json({
        status: "error",
        statusCode,
        message,
    });
}

export  {
    AppError,
    handleError,
};
