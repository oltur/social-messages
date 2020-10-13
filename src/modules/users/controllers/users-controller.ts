import { Request, Response } from "express";

function usersIndexController(request: Request, response: Response) {
    response.send("Hello user");
}

export {
    usersIndexController,
};
