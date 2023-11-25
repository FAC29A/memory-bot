/* IMPORTS */
// Local Files
require('dotenv').config();

// Node Files
const fs = require('node:fs');
const path = require('node:path');


// Language Files
const tracery = require('tracery-grammar');
const nlp = require('compromise');
const grammar = require('./language/grammar.js');

// Discord Files
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { DISCORD_TOKEN } = require('./.env');


/* LANGUAGE */
// Tracery: Language Output
const grammarFac = tracery.createGrammar(grammar.fac29a);
const outputFac = grammarFac.flatten('#gossip#');

console.groupCollapsed('Tracery Tests');
console.log('Gossip: ' + outputFac);
console.groupEnd();


// Compromise: Language Input
const input = nlp('We are building a Discord bot that\'ll make things easier.');

console.groupCollapsed('Compromise Tests');
console.log('Original: ' + input.text());
input.verbs().toPastTense();
console.log('Past: ' + input.text());
input.nouns().toPlural();
console.log('Plural: ' + input.text());
console.log('Nouns: ' + input.match('#Noun').text());
console.groupEnd();


/* BOT ARCHITECTURE */
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');

// get an array of all folders in commands
const commandFolders = fs.readdirSync(foldersPath);

// loop through the folders array
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);

	// get an array of all files in the current folder
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// loop through the files array
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection
		// (key)command name: (value)exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(DISCORD_TOKEN);

// handle slash commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	// catch instances where there's no command
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});