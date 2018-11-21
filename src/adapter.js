const playersURL = 'https://tic-tac-tone-api.herokuapp.com/players/make'
const playersAllURL = 'https://tic-tac-tone-api.herokuapp.com/players'
const scoreboard = 'https://tic-tac-tone-api.herokuapp.com/scoreboard'
const gameURL = 'https://tic-tac-tone-api.herokuapp.com/games'

class Adapter {


  static getPlayers() {
    return fetch(playersAllURL).then(res => res.json())
  }

  static postPlayers(name, level) {
    return fetch(playersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        highest_level: level
      })
    }).then(res => res.json())
  }

  static scoreBoard(){
    return fetch(scoreboard).then(res => res.json())
  }

  static postGame(id, level) {
    return fetch(gameURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        player_id: id,
        highest_level: level
      })
    }).then(res => res.json())
    .then(console.log)
  }

}
