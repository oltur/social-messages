import {NextFunction, Request, Response} from "express";
import {getAuthenticationServiceInstance} from "../../authentication/services/authentication-service.provider";
import {AuthenticationService} from "../../authentication";
import {IMessage} from "../interfaces";
import {MessagesService} from "../services/messages.service";
import {AppError} from "../../common/utils/error-handler";

const authService: AuthenticationService = getAuthenticationServiceInstance();
const messageService: MessagesService = new MessagesService();

async function addMessageController(request: Request, response: Response, next: NextFunction): Promise<void> {
    const userId = await authService.getUserID(request.headers.authorization || "");
    const message = request.body.message as IMessage;
    message.userId = userId;
    try {
        const createdMessage = await messageService.addMessage(message);
        response.status(201).json({createdMessage});
    } catch (e) {
        next(new AppError(e.statusCode, "Add message error", e));
    }
}

export {
    addMessageController,
};
