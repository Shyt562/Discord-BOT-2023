const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('讓機器人說話')
        .addStringOption(option => option.setName('content').setDescription('輸入要說的話').setRequired(true)),

    async execute(client, interaction) {
        const content = interaction.options.getString('content')

        if (!content) return interaction.reply({ content: '請輸入一些要說的話', ephemeral: true })

        channel = interaction.channel

        const embed = new EmbedBuilder()
            .setTitle('已發送訊息')
            .setDescription(`**頻道:** ${channel}\n**內容:** ${content}`)

        try {
            await interaction.reply({ embeds: [embed], ephemeral: true})
            await channel.send(content)
        } catch (err) {
            await interaction.reply({ content: '我無法發送消息', ephemeral: true })
        }
    }
}
