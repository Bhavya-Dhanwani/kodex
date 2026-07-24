import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { RequestMessage } from "../types/chat";
import { getConversationTitle, getStream } from "../service/ai.service";
import { conversationDao } from "../dao/conversation.dao";
import { messageDao } from "../dao/message.dao";

/**
 * POST /api/v1/chat/conversation
 * 
 * req.body = {
 *     message: string,
 *     conversationId?: string
 * }
 */
export const chatController = asyncHandler(async (req: Request<{}, {}, RequestMessage>, res: Response): Promise<void> => {

    let { message, conversationId } = req.body;
    const user = req.user; // Assuming user is attached to the request object after authentication

    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!conversationId) {
        /**
         * user,title,
         */

        const title = await getConversationTitle({ message });
        const newConversation = await conversationDao.createConversation({
            user: user.userId,
            title,
        })

        conversationId = newConversation._id.toString();
    }

    await messageDao.createMessage({
        content: message,
        author: "user",
        conversation: conversationId
    })


    const stream = await getStream({ message });


    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let aiMessage:string = "";
    
    for await (const chunk of stream) {
        res.write(`data: ${chunk.text}\n\n`);

        aiMessage += chunk.text;
        
    }



    res.end();

    await messageDao.createMessage({
        content: aiMessage,
        author: "ai",
        conversation: conversationId
    })

})