import {NextFunction, Request, Response} from "express";
import {UserService} from "../services/user.service";

async function followController(request: Request, response: Response, next: NextFunction): Promise<void> {
    const followerId = request.body.followedId;
    const followingId = request.body.followingId;
    const userService = new UserService();

    try {
        const follow = await userService.follow(followerId, followingId);
        response.status(201).json(follow);
    } catch (e) {
        next(e);
    }
}

export {
    followController,
};
