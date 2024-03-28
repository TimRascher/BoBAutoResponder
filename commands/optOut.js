import { SlashCommandBuilder } from "discord.js"
import Targets from "../targets.js"
import targets from "../targets.js"

export default {
    data: new SlashCommandBuilder()
        .setName("optout")
        .setDescription("Opt Out of the BoB Auto Responder Good Times!"),
    /** @param { import("discord.js").Interaction } interaction */
    async execute(interaction) {
        if (interaction.member.roles.cache.has(Targets.OptIn.id)) {
            interaction.member.roles.remove(Targets.OptIn.id).catch(console.error)
        }
        if (!interaction.member.roles.cache.has(Targets.OptOut.id)) {
            interaction.member.roles.add(Targets.OptOut.id).catch(console.error)
        }
        interaction.reply({ content: "Opting You Out the Good Times. :'(", ephemeral: true })
    }
}