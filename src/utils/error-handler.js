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
    console.error(details);
    return response.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}

module.exports = {
    ErrorHandler,
    handleError
};
