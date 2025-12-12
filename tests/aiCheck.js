
/**
 * @typedef {import('discord.js').Message} Message
 */

/**
 * @param {Message} message 
 * @returns {boolean}
 */
export default async function aiCheck(message) {
    const msgText = checkForQuery(message)
    if (msgText == null) { return false }
    const reply = await message.reply("Thinking...")
    const aiWisdom = await new LocalAIClient({instructions: "Your name is BoB Auto Responder. You are super happy, and helpful, and you want everyone to like you."}).ask(msgText)
    await reply.edit(aiWisdom)
    return true
}


/**
 * @param {Message} message 
 * @returns {string?}
 */
function checkForQuery(message) {
    const msgText = message.content.trim()
    const isBobStart = msgText.toLocaleLowerCase().startsWith("bob:")
    if (isBobStart == false && message.mentions.has(message.client.user) == false) { return null }
    if (isBobStart) { return  msgText.slice(4).trim() }
    return msgText
}

/**
 * @typedef {"system" | "user" | "assistant"} Role
 *
 * @typedef {Object} ChatMessage
 * @property {Role} role
 * @property {string} content
 *
 * @typedef {Object} LocalAiClientOptions
 * @property {string} [baseUrl] - Base URL of the local AI server (default http://node2.home:8080)
 * @property {string} [model] - Model name (default "llama")
 * @property {string} [instructions] - Global instructions added to every request
 */


class LocalAIClient {
    /**
    * @param {LocalAiClientOptions} [options]
     */
    constructor(options) {
        this.baseUrl = options.baseUrl ?? "http://node2.home:8080"
        this.model = options.model ?? "llama"
        this.instructions = options.instructions ?? null
    }

    /**
    * Set system-level instructions that are prepended to each query.
    * @param {string} text
    */
    setInstructions(text) {
        this.instructions = text;
    }

    /**
    * Query the local AI server.
    *
    * @param {string} prompt - The user query.
    * @param {ChatMessage[]} [history] - Optional chat history.
    * @returns {Promise<string>} - AI-generated response text.
    */
    async ask(prompt) {
        /** @type { ChatMessage[] } */
        const messages = []

        if (this.instructions && this.instructions.trim().length > 0) {
            messages.push({
                role: "system",
                content: this.instructions
            })
        }
        messages.push({
            role: "user",
            content: prompt
        })
        const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: this.model,
                messages
            })
        })
        if (!response.ok) {
            return "BoB Auto Responder's Brain is down."
        }
        const data = await response.json()
        const content = data?.choices?.[0]?.message?.content

        if (!content) {
            return "BoB Auto Responder didn't have anything to say."
        }
        return content
    }
}