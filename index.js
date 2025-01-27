const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

// Use environment variables, falling back to config values if not set
const token = process.env.BOT_TOKEN || config.token;
const clientId = process.env.CLIENT_ID || config.clientId;
const channelId = process.env.CHANNEL_ID || config.channelId;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let count = 0;
let lastUserId = null;

const commands = [
  {
    name: 'checkcount',
    description: 'Check the current :3 count without breaking the streak',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log('Bot is ready!');
  count=Number(fs.readFileSync('count.txt'));
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== channelId) return;

  if (message.content.includes(':3')) {
    if (message.author.id !== lastUserId) {
      count++;
      fs.writeFile('count.txt', count, err => {console.error(err)})
      lastUserId = message.author.id;
      await updateTopic(message.channel);
    } else {
      await message.reply("You can't contribute to the streak twice in a row! Wait for someone else to send :3");
    }
  } else {
    if (count > 0) {
      await message.channel.send(`Streak broken! Total consecutive :3s from different users: ${count}`);
      count = 0;
      fs.writeFile('count.txt', count, err => {console.error(err)})
      lastUserId = null;
      await updateTopic(message.channel);
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.channelId !== channelId) return;

  if (interaction.commandName === 'checkcount') {
    await interaction.reply(`Current :3 count: ${count}`);
  }
});

async function updateTopic(channel) {
  try {
    await channel.setTopic(`Current :3 streak from different users: ${count}`);
  } catch (error) {
    console.error('Failed to update channel topic:', error);
  }
}

client.login(token);