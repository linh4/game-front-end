class Instructions{
  static getInstructions(){
    {/* <div id="instruction-box" style="display: none"></div> */}
    const container = document.getElementsByClassName('container')[0]
    container.style.opacity = .3
    const div = document.createElement('div')
    div.classList.add('instuctions')
    let innerDiv = []
    for (let i = 0; i < 3; i++){
      let newDiv = document.createElement('div')
      newDiv.classList.add(`innerDiv-${i}`)
      div.appendChild(newDiv)
      innerDiv.push(newDiv)
    }
    innerDiv[0].innerHTML = '<i class="fas fa-times-circle"></i>'
    let exitButton = innerDiv[0].querySelector('i')
    
    innerDiv[1].innerHTML = `<h1>Instructions: </h1><br>
                              <p>1. Welcome to Tip-Tap-Tone, the call and response game.</p>
                              <br><p>2. The computer plays a pattern and you the user have to repeat it back in order.</p>
                              <br><p>3. You have until you quit or time runs out to repeat back the longest chain of consecutive tones and taps possible.</p>
                              <br><p>4. Use mouse clicks, arrow keys, WASD, or IJKL to control the top, left, bottom, and right icons respectively.</p>`

    document.querySelector('#instruction-box').appendChild(div)
    document.querySelector('#instruction-box').style.display = 'block'
  }
}
