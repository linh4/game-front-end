document.addEventListener('DOMContentLoaded', () => {

const game = {
  gamePattern: [],
  level: 0,
  id: 0,
  sounds: {
    square: new Audio('sounds/a.wav'),
    triangle: new Audio('sounds/b.wav'),
    circle: new Audio('sounds/c.wav'),
    pacman: new Audio('sounds/d.wav')
  }
}

const start = document.querySelector('#start');
const level = document.querySelector('.level')

// start the game
start.addEventListener('click', () => {
  game.level++;
  level.innerText = game.level;
  startGame();
  console.log(game.level);
})

// game pattern
function startGame() {
  randomNum();
  let i = 0;
  let myInterval = setInterval(function () {
    game.id = game.gamePattern[i];
    let shape = document.getElementById(game.id).className
    // debugger
    console.log(game.id + ' ' + shape);
    addColor(game.id, shape);
    i++;
    if (i === game.gamePattern.length) {
      i = 0;
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
  setTimeout(function () {
    shapes.classList.remove(shape + '-active');
  }, 300)
}

// assign the audio to shape




})
