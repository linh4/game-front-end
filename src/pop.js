const image = document.querySelector('#image');
const audio = new Audio('pop/pop.wav');

class Pop {
  static popup(second) {
      let playImage = setTimeout(() => {
      image.style.display = "none";
      if (second % 10 === 0 && second !== 0) {
        audio.play();
        image.style.display = "block";
        clearInterval(playImage)
      }

    }, 2000)
  }
}
