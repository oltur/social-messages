const http = require("http");
const dotenv = require("dotenv");
const { onListening } = require("../src/utils/server-utils");

if (process.env.ENV === "DEVELOPMENT") {
    dotenv.config();
}

const app = require("../src/app");
const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port);
server.on("listening", onListening(port));

process.on("unhandledRejection", function (reason) {
    throw reason;
});

process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
    process.exit(1);
});
