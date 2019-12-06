const AuthService = require("../services/authentication-service");
const { ErrorHandler } = require("../utils/error-handler");
const authService = new AuthService();

async function loginController (request, response, next) {
    const { user, password } = request.body;
    try {
        const login = await authService.login(user, password);
        response.send(login);
    } catch (e) {
        next(new ErrorHandler(500, "Cant login", e));
    }
}

module.exports = {
    loginController
};
