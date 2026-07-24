import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { RequestMessage } from "../types/chat";
import { getConversationTitle } from "../service/ai.service";

export const chatController = asyncHandler(async (req: Request<{}, {}, RequestMessage>, res: Response) => {

    let { message, conversationId } = req.body;
    const user = req.user; // Assuming user is attached to the request object after authentication

    if (!conversationId) {
        /**
         * user,title,
         */

        const title = await getConversationTitle({ message });
    }

})