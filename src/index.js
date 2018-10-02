document.addEventListener('DOMContentLoaded', () => {


  Adapter.getPlayers()
  .then(res => console.log(res))



  const game = {
    gamePattern: [],
    userPattern: [],
    level: 0,
    id: 0,
    shape: 0,
    error: false,
    sounds: ['sounds/a.wav', 'sounds/b.wav', 'sounds/c.wav', 'sounds/d.wav'],
    winnerLevel: 10
  }

  const start = document.querySelector('#start');
  const level = document.querySelector('.level')
  const clock = document.querySelector("#timer")
  const userForm = document.querySelector('#name-box')
  level.innerText = 0;
  let second;
  let interval;



  // start the game
  start.addEventListener('click', () => {
    game.level = 0;
    game.level++;
    game.userPattern = [];
    game.gamePattern = [];
    resetTimer();
    startTimer();
    gameTrack();
    document.removeEventListener('click', handleClick);
    document.addEventListener('click', handleClick);
  })

  function startTimer() {
    userForm.style.display = 'none'
    interval = setInterval(()=>{
      second--
      if (second < 0) {
        clearInterval(interval);
        clock.innerText = 'You Lose!'
        let timeOut = setTimeout(() => {
          userForm.style.display = 'block'
          console.log(game.level);
          User.getUserName(game.level)
        }, 1000)
        document.removeEventListener('click', handleClick);
      }
      else {
        return clock.innerHTML = '00: ' + (second < 10 ? "0" + second : second);
      }
    }, 1000);
  }

  function resetTimer(){
        second = 2;
        clearInterval(interval);
        clock.innerText = "00: 60";
    }

  function handleClick(e){
    if (e.target.classList[1]){
      game.id = parseInt(e.target.id);
      game.shape = e.target.classList[0];
      userTrack();
      }
  }

  // user Pattern
  function userTrack() {
    game.userPattern.push(game.id);
    addColor(game.id, game.shape)
    // check the same pattern
    if (!checkSamePattern()) {
      game.error = true;
      displayError();
      game.userPattern = [];
      gameTrack();
    }

    // check the end of pattern
    else if (game.userPattern.length === game.gamePattern.length && game.userPattern.length < game.winnerLevel) {
      game.level++;
      game.error = false;
      game.userPattern = [];
      gameTrack();
    }

    // check winner
    if (game.userPattern.length === game.winnerLevel) {
      displayWinner();
      // resetGame();
    }
  }


  // game pattern
  function gameTrack() {
    level.innerText = game.level;
    if (!game.error) {
      randomNum();
    }
    else {
      game.error = false;
    }
    let i = 0;
    let myInterval = setInterval(function () {
      // debugger
      game.id = game.gamePattern[i];
      game.shape = document.getElementById(game.id).classList[0];
      addColor(game.id, game.shape);
      i++;
      if (i === game.gamePattern.length) {
        clearInterval(myInterval)
      }
    }, 100);
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
    }, 100)
  }

  // play audio
  function addSound(id) {
    let sound = new Audio(game.sounds[id]);
    sound.play();
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
    let count = 0;
    let myError = setInterval(() => {
      level.innerText = '!!!';
      count++;
      if (count === 2) {
        level.innerText = game.level;
        clearInterval(myError);
        game.userPattern = [];
        count = 0;
      }
    }, 100)
  }

  function displayWinner() {
    level.innerText = 'Win';
  }

  function resetGame() {
    game.gamePattern = [];
    game.userPattern = [];
    game.level = 0;
    level.innerText = game.level;
    document.removeEventListener('click', handleClick);
  }





})
