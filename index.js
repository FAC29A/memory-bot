/* IMPORT MODULES */
const grammar = require('./language-output/grammar.js');
const tracery = require('tracery-grammar');


/* DISCORD.JS */


/* COMPROMISE: Language Input */


/* TRACERY: Language Output */

/* let grammarExample = tracery.createGrammar(grammar.example);
let outputExample = grammarExample.flatten("#origin#");
console.log(outputExample); */

let grammarFac = tracery.createGrammar(grammar.fac29a);
let outputFac = grammarFac.flatten("#gossip#");
console.log(outputFac);