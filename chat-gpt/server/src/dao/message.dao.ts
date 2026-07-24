import { MessageModel, type MessageDocument } from "./models/message.model.js"
import type { Message } from "../types/chat.js"


class MessageDAO {


    async createMessage(messageData: Message): Promise<MessageDocument> {

        const { content, author, conversation } = messageData;

        const message = await MessageModel.create({ content, author, conversation });

        return message;
    }

}

export const messageDao = new MessageDAO();