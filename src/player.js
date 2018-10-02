const nameBox = document.querySelector('#name-box')
class Player {

  static getUserName(level) {
    let form = document.querySelector('form')
    form.dataset.level = level;
    form.addEventListener('submit', (e) => Player.getPlayer(e, level))
  }

  static getPlayer(e, level) {
    e.preventDefault()
    let name = e.target.name.value;
    e.target.name.value = "";
    e.target.parentElement.style.display = 'none'
    return Adapter.postPlayers(name)
      .then(player => {
        Adapter.postGame(player.id, level).then(console.log)
      })
  }

  static tableScores() {

  }





}
