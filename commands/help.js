const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('機器人的指令清單'),

    async execute(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle('幫助頁面')
            .setDescription('這是幫助頁面，你可以在這裡找到所有指令')
            .addFields({
                name: '資訊',`/help`, `/user-info`, `/role-info`'
            }, {
                name: '實用/娛樂',`/calc`, `/say`, `/choose`, `/uuid`, `/translate`'
            }, {
                name: '管理',`/ban`'
            })
            .setColor(0x5865F2)

        await interaction.reply({ embeds: [embed] })
    }
}
