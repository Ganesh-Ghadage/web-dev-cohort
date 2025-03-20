
const emojis = [
  {
    emoji: '😺',
    caption: 'cat'
  },
  {
    emoji: '🐭',
    caption: 'mouse'
  },
  {
    emoji: '🐵',
    caption: 'monkey'
  },
  {
    emoji: '🦊',
    caption: 'fox'
  },
  {
    emoji: '🐼',
    caption: 'panda'
  },
  {
    emoji: '🐶',
    caption: 'dog'
  },
  {
    emoji: '🐮',
    caption: 'cow'
  },
  {
    emoji: '🦁',
    caption: 'lion'
  },
];

const movesDiaplay = document.getElementById('moves')
const timeDiaplay = document.getElementById('time')
const gameContainer = document.getElementById('gameContainer')

const winDisplay = document.createElement('p')

let seconds = 0;
let minutes = 0;
let timerIdx = null
let prevIds = []
let currentFlippedCards = []
let checkedCards = []
let moves = 0

function startGame() {

  winDisplay.textContent = ''

  displayCards()

  timerIdx = setInterval(() => {
    seconds++
    if(seconds === 60) {
      minutes++
      seconds = 0
    }
    timeDiaplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, 1000)
}

function displayCards() {
  for (let i = 0; i < 16; i++){
    const card = document.createElement('div')
    card.classList.add('card')
  
    const cardFront = document.createElement('div')
    cardFront.classList.add('card-front')
    cardFront.textContent = '?'
    
    const cardBack = document.createElement('div')
    cardBack.classList.add('card-back')
  
    const randomIdx = generateRandomId()
    prevIds.push(randomIdx)
    cardBack.textContent = emojis[randomIdx].emoji
    
    card.setAttribute("data", emojis[randomIdx].caption)
    
    card.appendChild(cardFront)
    card.appendChild(cardBack)
  
    card.onclick = () => cardClick(card)
  
    gameContainer.appendChild(card)
  }
}

function cardClick(card) {
  const cards = document.querySelectorAll('.card')

  if(currentFlippedCards.length >= 2) {
    cards.forEach(item => {
      if(!checkedCards.includes(item)){
        item.classList.remove('flipped')
      }
    });
    currentFlippedCards = []
  }

  flipCard(card)

  if(currentFlippedCards.length >= 2) {
    moves++
    movesDiaplay.textContent = moves
    if(checkCard()) {
      checkedCards.push(...currentFlippedCards)
    }
  }

  checkWin()

}

function flipCard(card) {
  if(card.classList.contains('flipped')){
    card.classList.remove('flipped')
    currentFlippedCards = currentFlippedCards.filter((item) => item !== card)
  } else {
    card.classList.add('flipped')
    currentFlippedCards.push(card)
  }
}

function checkCard() {
  return currentFlippedCards[0].attributes.data.value === currentFlippedCards[1].attributes.data.value
}

function checkWin() {
  if(checkedCards.length === 16){
    clearInterval(timerIdx)
    
    winDisplay.textContent = `You won a Game with ${moves} moves in ${minutes} min ${seconds.toString().padStart(2, '0')} sec`
    winDisplay.style.fontSize = '2em'
    winDisplay.style.color = 'green'
    document.body.appendChild(winDisplay)
  }
}

function restartGame() {
  gameContainer.innerHTML = ''
  clearInterval(timerIdx)
  seconds = 0;
  minutes = 0;
  timerIdx = null
  prevIds = []
  currentFlippedCards = []
  checkedCards = []
  moves = 0

  timeDiaplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
  movesDiaplay.textContent = moves

  startGame()
}

function generateRandomId() {
  let randomId = Math.floor(Math.random() * emojis.length)

  if(prevIds.includes(randomId)) {
    if(prevIds.length === emojis.length) {
      prevIds = []
    }
    return generateRandomId()
  }

  return randomId
}

// startGame()