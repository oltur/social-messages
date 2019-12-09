const { ErrorHandler } = require("../utils/error-handler");
const router = require("express").Router();

function pageNotFoundHandler (req, res, next) {
    throw new ErrorHandler(404, "Not found");
}

// 404 page
router.use(pageNotFoundHandler);

module.exports = router;
