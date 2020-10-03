import {Request, Response, Router} from "express";
import { ErrorHandler } from "../../common/utils/error-handler";


const router = Router();

function pageNotFoundHandler (request: Request, response: Response) {
    throw new ErrorHandler(404, "Not found");
}

// 404 page
router.use(pageNotFoundHandler);

export default router;
