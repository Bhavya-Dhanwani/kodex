import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, createAgent } from "langchain"

import rl from "readline/promises";
import dotenv from "dotenv";
dotenv.config();

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});


if (!process.env.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is not defined in the environment variables.");
}

const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-medium-latest",
})

const agent = createAgent({
    model
})

const chatHistory: (HumanMessage | AIMessage)[] = [];
let responseText = "";

while (true) {
    const prompt = await readline.question("Enter your prompt: ");

    chatHistory.push(new HumanMessage(prompt));

    const stream = await agent.stream({
        messages: chatHistory,
    },
        { streamMode: "messages" }
    );


    for await (const [token, metadata] of stream) {
        process.stdout.write(token.text);
        responseText += token.text;
    }

    chatHistory.push(new AIMessage(responseText));
    responseText = "";
    process.stdout.write("\n");
}