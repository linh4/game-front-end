document.addEventListener('DOMContentLoaded', () => {
  const game = {
    gamePattern: [],
    userPattern: [],
    level: 0,
    id: 0,
    shape: 0,
    error: false,
    sounds: ['sounds/a.wav', 'sounds/b.wav', 'sounds/c.wav', 'sounds/d.wav'],
    winnerLevel: 20
  }

  const start = document.querySelector('#start');
  const fast = document.querySelector('#fast');
  const level = document.querySelector('.level');
  const clock = document.querySelector("#timer");
  const userForm = document.querySelector('#name-box');
  const boardBtn = document.querySelector('#boardBtn');
  const quitBtn = document.querySelector('#quit');
  const container = document.getElementsByClassName('container')[0]
  const cancelBtn = userForm.querySelectorAll('.btn-warning')[0]
  const table = document.querySelector('#table');
  level.innerText = 0;
  let second;
  let interval;
  let speed = 1000;
  clock.innerText = "00: 60";

  quitBtn.disabled= true;

  // post players
  const form = userForm.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    e.target.name.value = "";
    e.target.parentElement.parentElement.style.display = 'none';
    resetGame();
    level.innerText = 0;
    boardBtn.disabled= false;
    level.innerText = 0;
    clock.innerText = "-- --"
    return Adapter.postPlayers(name, form.dataset.level)
  });

  // toggle the scoreBoard
  boardBtn.addEventListener('click', () => {
    if (table.style.display === "none") {
      Player.tableScores()
      table.style.display = "block";
    } else {
      table.style.display = "none";
    }
  })

  // quit the game
  quitBtn.addEventListener('click', () =>{
    clock.innerText = "That's it?"
    clearInterval(interval);
    let timeOut = setTimeout(() => {
      userForm.style.display = 'block';
      Player.getUserName(game.level)
    }, 500)
    document.removeEventListener('click', handleClick);
    boardBtn.disabled= false;
  })

  cancelBtn.addEventListener('click', () => {
    userForm.style.display = 'none'
    container.style.opacity = 1 //*NOTE: need this for the fade-in and out
    resetGame();
    level.innerText = 0;
    clock.innerText = "-- --"
  })

  // start the game
  start.addEventListener('click', () => {
    resetGame();
    resetTimer();
    gameTrack();
    document.removeEventListener('click', handleClick);
    document.addEventListener('click', handleClick);
    boardBtn.disabled= true;
    quitBtn.disabled= false;
  })

  function resetTimer(){
    second = 60;
    clearInterval(interval);
    clock.innerText = "00: " + second;
    startTimer();
  }

  function startTimer() {
    userForm.style.display = 'none'
    interval = setInterval(()=>{
      second--
      if (second < 0) {
        clearInterval(interval);
        clock.innerText = 'You Lose!!!!';
        let timeOut = setTimeout(() => {
          userForm.style.display = 'block';
          Player.getUserName(game.level)
        }, 1000)
        document.removeEventListener('click', handleClick);
      }
      else {
        return clock.innerHTML = '00: ' + (second < 10 ? "0" + second : second);
      }
    }, 1000);
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
      level.innerText = 'Win';
      let timeOut = setTimeout(() => {
        userForm.style.display = 'block';
        Player.getUserName(game.level);
      }, 1000)
      document.removeEventListener('click', handleClick);
      clock.innerText = '00: ' + (second < 10 ? "0" + second : second);;
      clearInterval(interval);
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
      game.id = game.gamePattern[i];
      game.shape = document.getElementById(game.id).classList[0];
      addColor(game.id, game.shape);
      i++;
      if (i === game.gamePattern.length) {
        clearInterval(myInterval);
      }
    }, speed);

    (speed > 50) ? (speed -= 50) : speed = 50;
    console.log(speed);

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

  function resetGame() {
    table.style.display = "none";
    game.level = 0;
    game.level++;
    game.userPattern = [];
    game.gamePattern = [];
  }

  Pop.getPop();

})
