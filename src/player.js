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





}
