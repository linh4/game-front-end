document.addEventListener('DOMContentLoaded', () => {

const game = {
  gamePattern: [],
  userPattern: [],
  level: 0,
  id: 0,
  shape: 0,
  sounds: ['sounds/a.wav', 'sounds/b.wav', 'sounds/c.wav', 'sounds/d.wav'],
  winnerLevel: 3
}

const start = document.querySelector('#start');
const level = document.querySelector('.level')

// start the game
start.addEventListener('click', () => {
  game.level++;
  level.innerText = game.level;
  gameTrack();

  // user click
  let clickAll = document.querySelectorAll('.clicked');
  clickAll.forEach(clickOne => {
    clickOne.addEventListener('click', (e) => {
      game.id = parseInt(e.target.id);
      game.shape = e.target.className.split(' ')[0];
      game.userPattern.push(game.id);
      console.log(game.id + ' ' + game.shape);
      addColor(game.id, game.shape)

      // check the same pattern
      if (!checkSamePattern()) {
        displayError();
        game.userPattern = [];
      }

      // check the end of pattern
      if (game.userPattern.length === game.gamePattern.length && game.userPattern.length < game.winnerLevel) {
        game.level++;
        level.innerText = game.level;
        game.userPattern = [];
        gameTrack();
      }

      // check winner
      if (game.userPattern.length === game.winnerLevel) {
        level.innerText = 'Win';
      }
    })
  })

})

// game pattern
function gameTrack() {
  randomNum();
  let i = 0;
  let myInterval = setInterval(function () {
    game.id = game.gamePattern[i];
    console.log(game.gamePattern);
    game.shape = document.getElementById(game.id).className.split(' ')[0]
    // debugger
    console.log(game.id + ' ' + game.shape);
    addColor(game.id, game.shape);
    i++;
    if (i === game.gamePattern.length) {
      clearInterval(myInterval)
    }
  }, 500);
}

//generate random number for pattern
function randomNum() {
  let random = Math.floor(Math.random() * 4)
  game.gamePattern.push(random);
}

// assign active color
function addColor(id, shape) {
  let shapes = document.getElementById(id)
  shapes.classList.add(shape + '-active');
  addSound(id);
  setTimeout(function () {
    shapes.classList.remove(shape + '-active');
  }, 300)
}

// play audio
function addSound(id) {
  let sound = new Audio(game.sounds[id]);
  sound.play();
  sound.volume = 1.0;
}

function checkSamePattern() {
  for (let i = 0; i < game.userPattern.length; i++) {
    if (game.userPattern[i] !== game.gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function displayError() {
  console.log('error');
  let count = 0;
  let myError = setInterval(() => {
    level.innerText = '!!!';
    count++;
    if (count === 3) {
      level.innerText = game.level;
      clearInterval(myError);
      game.userPattern = [];
      count = 0;
    }
  }, 300)
}



})
