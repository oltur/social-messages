"use strict";

import dotenv from "dotenv";
import { createServer, Server } from "http";
if (process.env.ENV === "DEVELOPMENT") {
    dotenv.config();
}
import { app } from "./modules/app";
import { onListening } from "./modules/common/utils/server-utils";
import { generalConfig } from "./modules/config/general";

const port: number = generalConfig.env.PORT;

const server: Server = createServer(app);

server.listen(port);
server.on("listening", onListening(port));

process.on("unhandledRejection", (reason) => {
    throw reason;
});

process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
    process.exit(1);
});
