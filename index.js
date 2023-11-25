/* IMPORTS */
// Local Files
require('dotenv').config();

// Language Files
const tracery = require('tracery-grammar');
const nlp = require('compromise');
const grammar = require('./language/grammar.js');

// Discord Files
const { Client, Events, GatewayIntentBits } = require('discord.js');
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

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);