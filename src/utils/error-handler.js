"use strict";

class ErrorHandler extends Error {
    constructor (statusCode, message, details = null) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
    }
}

function handleError (error, response) {
    const { statusCode, message, details } = error;
    console.error(error);
    return response.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        details
    });
}

module.exports = {
    ErrorHandler,
    handleError
};
