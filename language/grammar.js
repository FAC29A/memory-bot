let example = {
	"name": ["Arjun","Yuuma","Darcy","Mia","Chiaki","Izzi","Azra","Lina"],
	"animal": ["unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten"],
	"occupationBase": ["wizard","witch","detective","ballerina","criminal","pirate","lumberjack","spy","doctor","scientist","captain","priest"],
	"occupationMod": ["occult ","space ","professional ","gentleman ","erotic ","time ","cyber","paleo","techno","super"],
	"strange": ["mysterious","portentous","enchanting","strange","eerie"],
	"tale": ["story","saga","tale","legend"],
	"occupation": ["#occupationMod##occupationBase#"],
	"mood": ["vexed","indignant","impassioned","wistful","astute","courteous"],
	"setPronouns": ["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"],
	"setSailForAdventure": ["set sail for adventure","left #heroTheir# home","set out for adventure","went to seek #heroTheir# forture"],
	"setCharacter": ["[#setPronouns#][hero:#name#][heroJob:#occupation#]"],
	"openBook": ["An old #occupation# told #hero# a story. 'Listen well' she said to #hero#, 'to this #strange# #tale#. ' #origin#'","#hero# went home.","#hero# found an ancient book and opened it.  As #hero# read, the book told #strange.a# #tale#: #origin#"],
	"story": ["#hero# the #heroJob# #setSailForAdventure#. #openBook#"],
	"origin": ["Once upon a time, #[#setCharacter#]story#"]
}

let fac29a = {
	"adjective": [
		"attractive", "brilliant", "compelling", "delightful", "erudite", "fascinating", "glorious", "heroic", "illustrious", /*"j", "k", */"luxurious", "multifaceted", "necessary", /* "o",  */"perfection", /* "q",  */"revered", "splendid", "titillating", "unstoppable", "virtue incarnate", "well-respected", /* "x",  */"yummy", /* "z" */
	],
	"coder": [
		"Alex", "Daniel", "Esti", "Fran", "Jason", "Lucia", "Lucien", "Marika", "Oskar", "Paing", "Phoebe", "Zukhra"
	],
	"opinion": [
		"believes", "has heard from #coder#", "knows", "reckons", "told #coder#"
	],
	"preamble": ["Guess what!", "Have you heard the news?", "Word on the street is that", "Don't tell anyone, but", "OMG you'll never guess what I heard...", "I don't know how true it is, but apparently"],
	"gossip": ["#preamble# #coder# #opinion# that #coder# is #adjective#."]
}

module.exports = {example, fac29a};