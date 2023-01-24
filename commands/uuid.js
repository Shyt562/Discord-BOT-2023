const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { v4: uuidv4 } = require('uuid')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uuid')
        .setDescription('Generate a UUID'),

    async execute(client, interaction) {
        const uuid = uuidv4()

        const embed = new EmbedBuilder()
            .setTitle('UUID')
            .setDescription(uuid)
            .setColor(0x4B0082)

        await interaction.reply({ embeds: [embed] })
    }
}