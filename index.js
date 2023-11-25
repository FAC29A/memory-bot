/* IMPORT MODULES */
require('dotenv').config();

const grammar = require('./language/grammar.js');
const tracery = require('tracery-grammar');
const nlp = require('compromise');

/* DISCORD.JS */


/* TRACERY: Language Output */

/* let grammarExample = tracery.createGrammar(grammar.example);
let outputExample = grammarExample.flatten("#origin#");
console.log(outputExample); */

const grammarFac = tracery.createGrammar(grammar.fac29a);
const outputFac = grammarFac.flatten('#gossip#');

console.groupCollapsed('Tracery Tests');
console.log('Gossip: ' + outputFac);
console.groupEnd();


/* COMPROMISE: Language Input */
const input = nlp('We are building a Discord bot that\'ll make things easier.');

console.groupCollapsed('Compromise Tests');
console.log('Original: ' + input.text());
input.verbs().toPastTense();
console.log('Past: ' + input.text());
input.nouns().toPlural();
console.log('Plural: ' + input.text());
console.log('Nouns: ' + input.match('#Noun').text());
console.groupEnd();