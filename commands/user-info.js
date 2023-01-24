const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Replies with the user\'s information')
        .addUserOption(option => option.setName('user').setDescription('The user\'s information you want to see')),
        
    async execute(client, interaction) {
        const user = interaction.options.getUser('user') || interaction.user

        const embed = new EmbedBuilder()
            .setTitle('使用者資訊')
            .setDescription(`名稱: ${user.tag}\nID: ${user.id}\n建立時間: <t:${~~(user.createdTimestamp/1000)}:R>\n頭像: [連結](${user.displayAvatarURL()})`)
            .setThumbnail(user.displayAvatarURL())
            .setColor(0x00FF00)

        await interaction.reply({
            embeds: [embed]
        })
    },
}