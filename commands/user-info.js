const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('查看用戶資訊')
        .addUserOption(option => option.setName('user').setDescription('請選擇你要查看的用戶')),
        
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
