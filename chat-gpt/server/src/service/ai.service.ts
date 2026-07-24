import { ChatMistralAI } from "@langchain/mistralai"
import { createAgent,HumanMessage } from "langchain"
import { env } from "../config/env"
import * as z from "zod"

const smallModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: env.mistralApiKey
})

export async function getConversationTitle({ message }: { message: string }): Promise<string> {

    const agent = createAgent({
        model: smallModel,
        responseFormat: z.object({
            title: z.string().max(30).describe("The title of the conversation, max 30 characters")
        }),
        systemPrompt: `You are an assistant that generates a concise title for a conversation based on the user's first message.`
    })

    const response = await agent.invoke({
        messages: [
            new HumanMessage(message)
        ]
    })

    return response.structuredResponse.title

}