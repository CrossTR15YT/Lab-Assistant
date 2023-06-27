const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// Read the command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
  console.log(`[INFO] Lab Assistant Initialized`);

  // Register slash commands
  try {
    const commands = await client.guilds.cache.get('880415508774678618').commands.set(client.commands.map(command => command.data));
    console.log(`[INFO] Registered ${commands.size} slash commands`);
  } catch (error) {
    console.error('[ERROR] Failed to register slash commands:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
  }
});

client.login(token);
