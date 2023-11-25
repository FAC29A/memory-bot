require('dotenv').config();

const axios = require('axios');
const tracery = require('tracery-grammar');
const nlp = require('compromise');
const grammar = require('./language/grammar.js');
const { Client, Intents } = require('discord.js');
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});
const memeApiUrl = 'https://api.imgflip.com/get_memes';
const giphyApiKey = process.env.GIPHY_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

client.once('ready', () => {
	console.log('JPL-bot is online!');
});

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;

	const args = message.content.trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'gif') {
		try {
			const response = await axios.get(
				`http://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`
			);
			const gifUrl = response.data.data.images.original.url;
			message.channel.send({ files: [gifUrl] });
		} catch (error) {
			message.channel.send('Failed to retrieve a GIF.');
		}
	}

	if (command === 'ping') {
		message.channel.send('Pong!');
	} else if (command === 'echo') {
		const echoMessage = args.join(' ');
		if (!echoMessage) {
			message.channel.send('Please provide a message to echo.');
		} else {
			message.channel.send(echoMessage);
		}
	} else if (command === 'userinfo') {
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`
		);
	} else if (command === 'weather') {
		if (args.length === 0) {
			message.channel.send('Please provide a city name. eg. weather London');
		} else {
			const city = args.join(' ');
			try {
				const response = await axios.get(
					`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
				);
				const weatherData = response.data;
				message.channel.send(
					`Weather in ${city}: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`
				);
			} catch (error) {
				message.channel.send(`Could not retrieve weather for ${city}`);
			}
		}
	} else if (
		command === 'hello' ||
    message.mentions.users.has(client.user.id)
	) {
		message.channel.send('Hello there!');
	}

	if (command === 'gossip') {
		const grammarFac = tracery.createGrammar(grammar.fac29a);
		const gossip = grammarFac.flatten('#gossip#');
		message.channel.send(gossip);
	}

	if (command === 'analyse') {
		const inputText = args.join(' ');
		if (!inputText) {
			message.channel.send('Please provide some text to analyse.');
			return;
		}

		const input = nlp(inputText);
		const verbsToPast = input.clone();
		verbsToPast.verbs().toPastTense();
		const pastSentence = verbsToPast.out('text');

		const nounsToPlural = input.clone();
		nounsToPlural.nouns().toPlural();
		const pluralSentence = nounsToPlural.out('text');

		const nouns = input.match('#Noun').out('array').join(', ');

		const response =
      `Original: ${inputText}\n` +
      `Past: ${pastSentence}\n` +
      `Plural: ${pluralSentence}\n` +
      `Nouns: ${nouns || 'None found'}`;
		message.channel.send(response);
	}

	if (command === 'meme') {
		try {
			const response = await axios.get(memeApiUrl);
			const memes = response.data.data.memes;
			const randomMeme = memes[Math.floor(Math.random() * memes.length)];
			message.channel.send({ files: [randomMeme.url] });
		} catch (error) {
			console.error(error);
			message.channel.send('Failed to retrieve a meme.');
		}
	}
});

client.login(process.env.DISCORD_TOKEN);
