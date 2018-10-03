document.addEventListener('DOMContentLoaded', () => {
  const game = {
    gamePattern: [],
    userPattern: [],
    level: 0,
    id: 0,
    shape: 0,
    error: false,
    sounds: ['sounds/a.wav', 'sounds/b.wav', 'sounds/c.wav', 'sounds/d.wav'],
    winnerLevel: 20,
    keyboardWorking: false
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
  const form = userForm.querySelector('form')
  level.innerText = 0;
  let second;
  let interval;
  let speed = 600;

  clock.innerText = "00: 60";
  quitBtn.disabled= true;

  Instructions.getInstructions()
  const instructionBox = document.querySelector('#instruction-box'),
      exitButton = instructionBox.querySelector('i')

  exitButton.addEventListener('click', (evt) => closeInstructionWindow(evt))

  function closeInstructionWindow(evt){
      evt.target.parentElement.parentElement.parentElement.style.display = 'none'
      container.style.opacity = 1
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    e.target.name.value = "";
    e.target.parentElement.parentElement.style.display = 'none';
    level.innerText = 0;
    boardBtn.disabled= false;
    level.innerText = 0;
    clock.innerText = "-- --"
    Adapter.postPlayers(name, form.dataset.level)
    document.removeEventListener('click', handleClick);
    game.keyboardWorking = false
    resetGame();
    container.style.opacity = 1
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
    game.keyboardWorking = false;

    clock.innerText = "That's it?"
    clearInterval(interval);
    let timeOut = setTimeout(() => {
      userForm.style.display = 'block';
      Player.getUserName(game.level)
    }, 500)
    document.removeEventListener('click', handleClick);
    game.keyboardWorking = false
    boardBtn.disabled= false;
  })

  cancelBtn.addEventListener('click', () => {
    game.keyboardWorking = false
    userForm.style.display = 'none'
    container.style.opacity = 1 //*NOTE: need this for the fade-in and out
    resetGame();
    level.innerText = 0;
    clock.innerText = "-- --"
    document.removeEventListener('click', handleClick);
    game.keyboardWorking = false
  })

  // start the game
  start.addEventListener('click', () => {
    quitBtn.disabled = false;
    boardBtn.disabled = true;
    resetGame();
    resetTimer();
    gameTrack();
    document.removeEventListener('click', handleClick);
    document.addEventListener('click', handleClick);
    game.keyboardWorking = true
  })

  document.addEventListener("keyup", (e) => buttonPress(e))

  function buttonPress(event){
    // console.log(event.which) // *KEEP: for debugging purposes
    if (game.keyboardWorking){
      if (event.which == 87 || event.which == 38 || event.which == 73) {
        buttonInput(0, 'square')
      } else if (event.which == 40 || event.which == 83 || event.which == 75) {
        buttonInput(3, 'pacman')
      } else if (event.which == 37 || event.which == 65 || event.which == 74) {
        buttonInput(1, 'triangle')
      } else if (event.which == 39 || event.which == 68 || event.which == 76) {
        buttonInput(2, 'circle')
      }
    }

  }

  function buttonInput(gameId, gameShape){
    game.id = gameId
    game.shape = gameShape
    userTrack()
  }

  // function handleClick(e){
  //   if (e.target.classList[1]){
  //     game.id = parseInt(e.target.id);
  //     game.shape = e.target.classList[0];
  //     userTrack();
  //   }
  // }

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
        game.keyboardWorking = false;
        clearInterval(interval);
        clock.innerText = 'You Lose!!!!';
        let timeOut = setTimeout(() => {
          userForm.style.display = 'block'
          container.style.opacity = .3 //*NOTE: need this for the fade-in and out
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
      (speed > 50) ? (speed -= 50) : speed = 50;
      console.log(speed);
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
    speed = 600;
  }

  Pop.getPop();

})
