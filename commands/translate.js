const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate a text')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to translate')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('from')
                .setDescription('The language to translate from')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('to')
                .setDescription('The language to translate to')
                .setRequired(true)),

    async execute(client, interaction) {
        const text = interaction.options.getString('text')
        const fromlang = interaction.options.getString('from')
        const tolang = interaction.options.getString('to')

        const translate = require('@iamtraction/google-translate')
        
        try {
            var result = await translate(text, { from: fromlang, to: tolang})
        } catch (error) {
            interaction.reply({ content: 'Cannot translate the text', ephemeral: true })
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