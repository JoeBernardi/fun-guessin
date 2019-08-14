// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {
	CORRECT_NUMBER,
	GUESS_RANGE,
	PHRASEHUNT
} = require("./consts.js");

let lastGuess;
let bruteForceAttempts = 0;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/2", function (request, response) {
  response.sendFile(__dirname + '/views/step2.html');
});

app.post("/", function (request, response) {
  console.log(request.body)
  const theirGuess = parseInt(request.body.number, 10);
  const status = parseGuess(theirGuess);
  response.send(status);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const parseGuess = function(guess) {
  if (!guess) {
    return {status: "invalid post"}
  }

  if (lastGuess && Math.abs(guess - lastGuess) === 1) {
    bruteForceAttempts++;
  } else {
    bruteForceAttempts = 0;
  }

  lastGuess = guess;

  if (bruteForceAttempts > 10) {
    return {status: "no brute forcing!"}
  }

  if (guess > GUESS_RANGE[1]) {
    const letterGuess = parseLetterModeGuess(guess);

    if (letterGuess) {
      return letterGuess;
    } else if (guess < GUESS_RANGE[0] || guess > GUESS_RANGE[1]) {
      return { status: "out of bounds" };
    }
  }

  let status = { status: "low" };

  if (guess > CORRECT_NUMBER) {
    status = { status: "high" };
  } else if (guess === CORRECT_NUMBER) {

    status = {
      status: "correct",
      nextNumber: 41665
    }
  }

  return status;
}

const parseLetterModeGuess = function(guess) {

  const correctAnswer = PHRASEHUNT.find((phraseObj) => {
    return phraseObj.number === guess;
  });

  if (correctAnswer) {
    const nextIndex = PHRASEHUNT.indexOf(correctAnswer) + 1;
    const nextItem = PHRASEHUNT[nextIndex];

    const correctObj = {
      letter: correctAnswer.letter
    }

    if (nextItem) {
      correctObj.nextNumber = nextItem.number;
    }

    return correctObj;
  }

  else { return false; }
}