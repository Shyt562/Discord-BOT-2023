const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban someone from server')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason to ban')),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'You don\'t have permission to ban members', ephemeral: true })

        const user = interaction.options.getUser('user')

        if (!user) return interaction.reply({ content: 'Please mention a user to ban', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)

        if (member.id === interaction.user.id) return interaction.reply({ content: 'You can\'t ban yourself', ephemeral: true })

        if (member.id === client.user.id) return interaction.reply({ content: 'You can\'t ban me', ephemeral: true })

        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: 'You can\'t ban this user', ephemeral: true })

        const reason = interaction.options.getString('reason') || 'No reason provided'

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
            return interaction.reply({ content: 'I was unable to ban the member', ephemeral: true })
        }
    }
}