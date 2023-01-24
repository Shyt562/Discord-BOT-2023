const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say something')
        .addStringOption(option => option.setName('content').setDescription('The content to say').setRequired(true)),

    async execute(client, interaction) {
        const content = interaction.options.getString('content')

        if (!content) return interaction.reply({ content: 'Please enter some content to say', ephemeral: true })

        channel = interaction.channel

        const embed = new EmbedBuilder()
            .setTitle('已發送訊息')
            .setDescription(`**頻道:** ${channel}\n**內容:** ${content}`)

        try {
            await interaction.reply({ embeds: [embed], ephemeral: true})
            await channel.send(content)
        } catch (err) {
            await interaction.reply({ content: 'I was unable to send the message', ephemeral: true })
        }
    }
}