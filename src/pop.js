class Pop {

  static getPop() {
    const image = document.querySelector('img');

    image.style.display = "none";

    image.addEventListener('click', () => {
      const audio = new Audio('pop/pop.wav')
      audio.play();
    })

  }
}
