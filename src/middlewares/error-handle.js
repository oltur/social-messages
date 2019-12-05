const { handleError } = require("../utils/error-handler");

const errorHandler = (error, request, response, next) => {
    handleError(error, response);
};

module.exports = errorHandler;
