const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-info')
        .setDescription('Replies with the role\'s information')
        .addRoleOption(option => option.setName('role').setDescription('The role\'s information you want to see')),
    async execute(client, interaction) {
        const role = interaction.options.getRole('role')

        if (!role) {
            await interaction.reply({
                content: '請提供一個身份組',
                ephemeral: true
            })
            return
        }

        const embed = new EmbedBuilder()
            .setTitle('身份組資訊')
            .setDescription(`名稱: ${role.name}\nID: ${role.id}\n顏色: ${role.hexColor}\n建立時間: <t:${~~(role.createdTimestamp/1000)}:R>\n權限: ${role.permissions.toArray().join(', ')}`)
            .setColor(role.hexColor)
        await interaction.reply({
            embeds: [embed]
        })
    },
}