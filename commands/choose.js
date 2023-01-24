const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('在多個選項之間進行選擇')
        .addStringOption(option => option.setName('title').setDescription('主題').setRequired(true))
        .addStringOption(option => option.setName('options').setDescription('選項, 使用英文逗號以分隔').setRequired(true)),

    async execute(client, interaction) {
        const title = interaction.options.getString('title')
        const options = interaction.options.getString('options').split(',')
        const option = options[Math.floor(Math.random() * options.length)]

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(`**已選擇的選項:** ${option}`)
            .setColor(0x4B0082)

        await interaction.reply({ embeds: [embed] })
    }
}

