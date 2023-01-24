const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('翻譯文字')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('要翻譯的文字')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('from')
                .setDescription('要翻譯的語言')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('to')
                .setDescription('要翻譯成的語言')
                .setRequired(true)),

    async execute(client, interaction) {
        const text = interaction.options.getString('text')
        const fromlang = interaction.options.getString('from')
        const tolang = interaction.options.getString('to')

        const translate = require('@iamtraction/google-translate')
        
        try {
            var result = await translate(text, { from: fromlang, to: tolang})
        } catch (error) {
            interaction.reply({ content: '我無法翻譯這個文字', ephemeral: true })
            console.log(error)
            return
        }

        const embed = new EmbedBuilder()
            .setTitle('翻譯')
            .setDescription(`**原文:** \`${text}\`\n**翻譯:** \`${result.text}\``)
            .setColor(0x4B0082)

        await interaction.reply({ embeds: [embed] })
    }
}
