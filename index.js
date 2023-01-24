const { Client, Events, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
})

client.on(Events.ClientReady, c => {
    console.log(`[SUCCESS] Logged in as ${c.user.tag}`)
    const { deployCmd } = require('./modules/deploy.js')
    deployCmd()
})

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        const { command } = require('./modules/command.js')
        command(client, interaction)
    } else if (interaction.isButton()) {
        const { button } = require('./modules/button.js.js')
        button(client, interaction)
    } else if (interaction.isStringSelectMenu()) {
        const { selectMenu } = require('./modules/selectMenu.js.js')
        selectMenu(client, interaction)
    } else if (interaction.isModalSubmit()) {
        const { modal } = require('./modules/modal.js')
        modal(client, interaction)
    } else if (interaction.isContextMenu()) {
        const { contextMenu } = require('./modules/contextMenu.js.js')
        contextMenu(client, interaction)
    }
})

client.login(token)