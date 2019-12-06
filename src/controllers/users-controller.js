function usersIndexController (request, response, next) {
    response.send("Hello user");
}

module.exports = {
    usersIndexController
};
