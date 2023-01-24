const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { evaluate } = require('mathjs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('計算數學題')
        .addStringOption(option =>
            option.setName('problem')
                .setDescription('要解決的數學問題')
                .setRequired(true)),
    
    async execute(client, interaction) {
        const problem = interaction.options.getString('problem')
        let answer = 0

        try {
            answer = evaluate(problem)
        } catch (error) {
            interaction.reply({ content: '無法解決此問題', ephemeral: true })
            return
        }

        const embed = new EmbedBuilder()
            .setTitle('Calculator')
            .setDescription(`**說明:** \`${problem}\` = ${answer}`)
            .setColor(0x4B0082)
        
        await interaction.reply({ embeds: [embed] })
    }
}
