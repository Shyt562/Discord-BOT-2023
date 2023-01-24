module.exports = { command }

async function command(client, interaction) {
    const { commandName } = interaction
    const command = require(`../commands/${commandName}.js`)
    command.execute(client, interaction)
}