// check the same pattern
if (!checkSamePattern()) {
  game.error = true;
  displayError();
  game.userPattern = [];
  gameTrack();
}

// check the end of pattern
if (game.userPattern.length === game.gamePattern.length && game.userPattern.length < game.winnerLevel) {
  game.level++;
  level.innerText = game.level;
  game.error = false;
  game.userPattern = [];
  gameTrack();
}

// check winner
if (game.userPattern.length === game.winnerLevel) {
  displayWinner();
}
