const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('從服務器停權用戶')
        .addUserOption(option => option.setName('user').setDescription('用戶').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('原因')),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: '您沒有權限可以停權用戶', ephemeral: true })

        const user = interaction.options.getUser('user')

        if (!user) return interaction.reply({ content: '請選擇你要停權的用戶', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)

        if (member.id === interaction.user.id) return interaction.reply({ content: '你無法停權你自己', ephemeral: true })

        if (member.id === client.user.id) return interaction.reply({ content: '你無法將我給停權', ephemeral: true })

        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: '您無法停權此用戶', ephemeral: true })

        const reason = interaction.options.getString('reason') || '沒有理由'

        const embed = new EmbedBuilder()
            .setTitle('已封禁使用者')
            .setDescription(`**使用者:** ${user.tag} (${user.id})\n**理由:** ${reason}`)
            .setColor(0xED4245)
            .setTimestamp()

        try {
            await member.ban({ reason: reason })
            await interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
            return interaction.reply({ content: '我無法停權該用戶', ephemeral: true })
        }
    }
}
