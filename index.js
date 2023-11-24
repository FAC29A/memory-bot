/* IMPORT MODULES */
const grammar = require('./language/grammar.js');
const tracery = require('tracery-grammar');
const nlp = require('compromise');


/* DISCORD.JS */


/* TRACERY: Language Output */

/* let grammarExample = tracery.createGrammar(grammar.example);
let outputExample = grammarExample.flatten("#origin#");
console.log(outputExample); */

let grammarFac = tracery.createGrammar(grammar.fac29a);
let outputFac = grammarFac.flatten("#gossip#");

console.groupCollapsed("Tracery Tests");
	console.log("Gossip: " + outputFac);
console.groupEnd();


/* COMPROMISE: Language Input */
let input = nlp("I'm a sleepy rabbit and I want a hot chocolate.");

console.groupCollapsed("Compromise Tests");
	console.log("Original: " + input.text());
	input.nouns().toPlural();
	console.log("Plural: " + input.text());
	input.verbs().toPastTense();
	console.log("Past: " + input.text());
	console.log("Nouns: " + input.match('#Noun').text());
console.groupEnd();