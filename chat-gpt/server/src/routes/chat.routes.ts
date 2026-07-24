import { Router } from "express";
import { chatController } from "../controllers/chat.controller";
import { authUserMiddleware } from "../middlewares/auth-user.middleware";
import { sendMessageValidation } from "../validations/chat.validation";
import { validateRequest } from "../validations/validate-request";


const chatRouter = Router();

chatRouter.use(authUserMiddleware);

chatRouter.post("/conversation",
    sendMessageValidation,
    validateRequest,
    chatController
)



export { chatRouter };  