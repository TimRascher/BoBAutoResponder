// import ClientSetup from "./setupDiscord.js"
import "dotenv/config"
import * as SideKick from "@jssidekick/discordcommon"
import { EmbedBuilder, AttachmentBuilder } from "discord.js"
import Targets from "./targets.js"
import { Message } from "discord.js"
import WordList from "./wordList.js"
import wordList from "./wordList.js"
import API from "./api.js"
import * as roles from "./serverRoleManagement.js"


(async () => {
    API.start()
    const secretImage = "https://tenor.com/view/secret-word-paul-rueben-peewee-gif-13742445"
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
            switch (message.author.id) {
                case Targets.Kyle:
                    break
                case Targets.Mez:
                    break
                case Targets.Tim: return
            }
            const ex = /(round.*?(up|down))/gi
            const matches = ex.exec(message.content)
            if (matches == null) { return }
            if (matches[1].split(" ").length > 2) { return }
            await message.reply("You know we DON'T!")
        },
        /** @param { Message } message */
        perchance: async (message) => {
            const regex = new RegExp(`\\bperchance\\b`, 'i')
            if (regex.test(message.content)) {
                message.reply("You can't just say perchance!")
            }
        },
        /** @param { Message } message */
        secretWord: async (message) => {
            const secret = await WordList.today()
            if (secret.isNew) {
                const adminChannel = message.client.channels.cache.get(Targets.AdminChannel)
                if (adminChannel) {
                    adminChannel.send(`Shh... Today's Secret Word is ||${secret.today.word}||`).catch(console.error)
                }
            }
            const regex = new RegExp(`\\b${secret.today.word}\\b`, 'i')
            if (regex.test(message.content)) {
                const attachment = new AttachmentBuilder("./data/secret-word.gif")
                const reply = async () => {
                    await message.reply({ content: `Yay! Today's Secret Word is '${secret.today.word}'!`, files: [attachment] })
                }
                const everyone = async (target) => {
                    await target.send({ content: `<@&${Targets.OptIn.id}> <@${message.author.id}> found Today's Secret Word, '${secret.today.word}'!\nOpt Out of these messages with /optout`, files: [attachment] })
                }
                if (secret.today.wasFound == false) {
                    await wordList.hasBeenFound()
                    if (message.channelId != Targets.MainChannel) { await reply() }
                    const mainChannel = message.client.channels.cache.get(Targets.MainChannel)
                    if (mainChannel) { await everyone(mainChannel) }
                    return
                }
                await reply()
            }
        }
    }
    const client = await SideKick.Setup()
    client.once('ready', async () => {
        await SideKick.RegisterCommands()
        await roles.createRoles(client, Targets)
        await roles.setRoles(client, Targets)
    })
    client.on('guildMemberAdd', async member => {
        await roles.setRoles(client, Targets)
    })
    client.on("messageCreate", async (message) => {
        if (message.author.id == Targets.Bot) { return }
        if (message.member.roles.cache.has(Targets.OptOut.id)) { return }
        await Tests.rounding(message)
        await Tests.perchance(message)
        await Tests.secretWord(message)
    })
    client.login(process.env.TOKEN)
})()