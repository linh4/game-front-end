class Player {

  static getUserName(level) {
    let form = document.querySelector('form');
    form.dataset.level = level;
  }

  static tableScores(e) {
      return Adapter.scoreBoard()
      .then(obj => {
        let tableHead = document.querySelector('thead');
        tableHead.innerHTML = `
        <tr>
        <td> # </td>
        <td>Player Name</td>
        <td>Level</td>
        </tr>
        `
        let tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';
        let num = 0;
        obj.forEach(score => {
          let row = document.createElement('tr');
          num++;
          if (num <= 10) {
            row.innerHTML = `
            <td>${num}</td>
            <td>${score.player.name}</td>
            <td>${score.highest_level}</td>
            `
            tableBody.append(row)
          }
        })
      })
  }

  static emptyScores(){
    const tableDiv = document.querySelector('#leaderboard-table')
    tableDiv.innerHTML= ""
  }

  static tableDivScores(e){
   const tableDiv = document.querySelector('#leaderboard-table')

    return Adapter.scoreBoard()
     .then(games => {
       games.forEach((game, idx) => {
       let addDiv = document.createElement('div')
       let place = idx + 1
       addDiv.classList.add(`place-${place}`)
       addDiv.classList.add(`idk`)
       addDiv.innerHTML =
           `<div><i class="fa fa-trophy" aria-hidden="true"></i></div>
           <tr><td>${place}${place == 1 ? 'st' : place == 2 ? 'nd' : place == 3 ? 'rd' : 'th'}  |   </td>
           <td>${game.player.name}  |  </td>
           <td>Level: ${game.highest_level}</td></tr>`
       tableDiv.append(addDiv)
       }
     )}
   )}

}
