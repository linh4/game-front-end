class Pop {

  static getPop() {
    const image = document.querySelector('#image');

    image.style.display = "block";

    image.addEventListener('click', () => {
      console.log("k");
      const audio = new Audio('pop/pop.wav')
      audio.play();
    })

  }
}
