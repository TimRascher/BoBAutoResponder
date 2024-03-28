import { SlashCommandBuilder } from "discord.js"
import Targets from "../targets.js"

export default {
    data: new SlashCommandBuilder()
        .setName("optin")
        .setDescription("Opt In to the BoB Auto Responder Good Times!"),
    /** @param { import("discord.js").Interaction } interaction */
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(Targets.OptIn.id)) {
            interaction.member.roles.add(Targets.OptIn.id).catch(console.error)
        }
        if (interaction.member.roles.cache.has(Targets.OptOut.id)) {
            interaction.member.roles.remove(Targets.OptOut.id).catch(console.error)
        }
        interaction.reply({ content: "Opting You Into the Good Times!", ephemeral: true })
    }
}