
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

const wordList = document.querySelector('.words');
let p = document.createElement('p');
wordList.appendChild(p)

recognition.addEventListener('result', e => { 
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('')
  console.log(transcript)
  p.textContent = transcript
  console.log(e.results[0].isFinal)

  // APPEND RESULT
  if (e.results[0].isFinal) { 
    p = document.createElement('p');
    wordList.appendChild(p)
  }

  // CLEAR THE SCREEN
  if (transcript.includes('clear the screen') && e.results[0].isFinal !== false) {
    wordList.innerHTML = ''
    cornify_click_cupcake_button();
    cornify_count = 0
    wordList.appendChild(p)
    p.textContent = ''
  }
  
  // UNICORNS!
  if ((/unicorn/).test(transcript) && e.results[0].isFinal) {
    cornify_add()
    cornify_add_cupcake_button()
  }
  
  if ((/unicorn party/).test(transcript)) {    
    let add = setInterval(cornify_add, 500)
    setTimeout(() => clearInterval(add), 2000)
  }
})

recognition.addEventListener('end', recognition.start)
recognition.start();

