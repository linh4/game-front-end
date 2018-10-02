const playersURL = 'http://localhost:3000/players'
const scoreboard = 'http://localhost:3000/scoreboard'
const gameURL = 'http://localhost:3000/games'

class Adapter {


  static getPlayers() {
    return fetch(playersURL).then(res => res.json())
  }

  static postPlayers(name) {
    return fetch(playersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({name: name})
    }).then(res => res.json())
  }

  static scoreBoard(){
    return fetch(scoreboard).then(res => res.json()).then(console.log)
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
  }

}
