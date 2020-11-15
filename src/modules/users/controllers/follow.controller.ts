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

async function unFollowController(request: Request, response: Response, next: NextFunction): Promise<void> {
    const followerId = request.body.followedId;
    const followingId = request.body.followingId;
    const userService = new UserService();

    try {
        const unFollow = await userService.unFollow(followerId, followingId);
        response.status(200).json(unFollow);
    } catch (e) {
        next(e);
    }
}

export {
    followController,
    unFollowController,
};
