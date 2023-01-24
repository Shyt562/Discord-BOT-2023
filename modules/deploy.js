const { REST, Routes } = require('discord.js')
const { clientID, guildID, token } = require('../config.json')
const fs = require('fs')

module.exports = { deployCmd }

const commands = []

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`../commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token)

async function deployCmd() {
    try {
        console.log('[INFO] Started to deploy application (/) commands')

        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands },
        )

        console.log('[SUCCESS] Successfully deployed application (/) commands')
    } catch (error) {
        console.error(error)
    }
}