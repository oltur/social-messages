function indexController (request, response) {
    response.send("Hello on index");
}

module.exports = {
    indexController
};
