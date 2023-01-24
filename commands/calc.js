const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { evaluate } = require('mathjs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('Calculate a math problem')
        .addStringOption(option =>
            option.setName('problem')
                .setDescription('The math problem to solve')
                .setRequired(true)),
    
    async execute(client, interaction) {
        const problem = interaction.options.getString('problem')
        let answer = 0

        try {
            answer = evaluate(problem)
        } catch (error) {
            interaction.reply({ content: 'Cannot resolve the math problem', ephemeral: true })
            return
        }

        const embed = new EmbedBuilder()
            .setTitle('Calculator')
            .setDescription(`**Problem:** \`${problem}\` = ${answer}`)
            .setColor(0x4B0082)
        
        await interaction.reply({ embeds: [embed] })
    }
}