"use strict";

import { Request, Response } from "express";

function indexController (request: Request, response: Response) {
    response.send("Hello on index");
}

export default indexController;
