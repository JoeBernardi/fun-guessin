const { GUESS_RANGE } = require("./consts.js");

// in case we want to switch things up, this will create a version of PHRASEHUNT in consts.js for any string.

const generatePhraseHunt = function(coolPhrase) {
		const phraseArr = coolPhrase.split("");
		const phraseHunt = [];

		var randomSpots = []
		while(randomSpots.length < phraseArr.length){
		    var randomnumber = Math.floor(Math.ceil(Math.random()*100000) + 1);
		    if(randomSpots.indexOf(randomnumber) > -1 || randomnumber <= GUESS_RANGE[1]) continue;
		    randomSpots[randomSpots.length] = randomnumber;
		}

		phraseArr.forEach((item, idx) => {
		  phraseHunt.push({number: [parseInt(randomSpots[idx])], letter: [item]});
		});

		return phraseHunt;
}