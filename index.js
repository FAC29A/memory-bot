/* IMPORT MODULES
	Node doesn't handle modules. Use require instead. So this:
		import * as grammar from language-output/grammar.js;
	becomes this:
		const grammar = require('./language-output/grammar.js');
*/
const grammar = require('./language-output/grammar.js');
const tracery = require('tracery-grammar');

/* DISCORD.JS */


/* COMPROMISE
Language Input */


/* TRACERY
Language Output
https://github.com/galaxykate/tracery/tree/tracery2 */

let gramExample = tracery.createGrammar(grammar.example);//grammar.json
let textExpansion = gramExample.flatten("#origin#");

console.log(textExpansion);