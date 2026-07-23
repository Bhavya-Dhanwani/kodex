import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, AIMessage, tool, createAgent } from "langchain"
import dotenv from "dotenv"
import rl from "readline/promises"
import * as z from "zod"
import fs from "fs/promises"


const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

dotenv.config()

if (!process.env.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is not set in the environment variables.")
}

const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY,
})


async function readMemoryFromFile(): Promise<string> {
    const data = await fs.readFile("./memory.md", "utf-8")
    return data
}

const readMemory = tool(
    readMemoryFromFile,
    {
        name: "readMemory",
        description: "Reads the memory from a file and returns it as a string.",
        schema: z.object({}),
    }
)

async function updateMemoryInFile({ newMemory }: { newMemory: string }): Promise<string> {
    await fs.writeFile("./memory.md", newMemory, "utf-8")
    return "Memory updated successfully."
}

const updateMemory = tool(
    updateMemoryInFile,
    {
        name: "updateMemory",
        description: "Updates the memory in the file with new content.",
        schema: z.object({
            newMemory: z.string().describe("The new memory content to be overwrite to the file."),
        }),
    }
)


const agent = createAgent({
    model,
    tools: [readMemory, updateMemory],
    systemPrompt: "You are a helpful assistant that can read memory from a file and answer questions based on that memory. Use the readMemory tool to access the memory when needed. update the memory if the fact is true for weeks/months"
})

const messages = []

while (true) {

    const prompt = await readline.question("Enter your prompt: ")

    messages.push(new HumanMessage(prompt))

    const response = await agent.invoke({
        messages
    })

    messages.push(new AIMessage(response.messages.at(-1)?.text || ""))

    console.log("Response:", response)

}