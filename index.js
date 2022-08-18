import ClientSetup from "./setupDiscord.js"
import Targets from "./targets.js"
import { Message } from "discord.js"

(async () => {
    const Tests = {
        roundingPrompts: [
            "round down",
            "round up",
            "rounddown",
            "roundup",
            "rounding"
        ],
        /** @param { Message } message */
        rounding: async (message) => {
            const ex = /(round.*?(up|down))/gi
            const matches = ex.exec(message.content)
            if (matches == null) { return }
            if (matches[1].split(" ").length > 2) { return }
            await message.reply("You know we DON'T!")
        }
    }
    const client = ClientSetup()
    client.on("messageCreate", async (message) => {
        switch (message.author.id) {
            case Targets.Kyle:
                await Tests.rounding(message)
                break
            case Targets.Tim: break
        }
    })
    client.login(process.env.TOKEN)
})()