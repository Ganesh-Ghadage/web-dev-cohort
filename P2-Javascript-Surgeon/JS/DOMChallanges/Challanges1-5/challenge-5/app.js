// Image data
const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];

const carouselTrack = document.getElementById('carouselTrack')
const caption = document.getElementById('caption')
const prevButton = document.getElementById('prevButton')
const nextButton = document.getElementById('nextButton')
const carouselNav = document.getElementById('carouselNav')
const autoPlayButton = document.getElementById('autoPlayButton')
const timerDisplay = document.getElementById('timerDisplay')

let currIdx = 0
let length = images.length

for (let i = 0; i < length; i++) {
  const indicator = createIndicators()
  indicator.setAttribute('id', i)
  indicator.addEventListener('click', () => displayImage(i))
  carouselNav.appendChild(indicator)
}

const indicators = document.querySelectorAll('.carousel-indicator')

displayImage(currIdx)

nextButton.addEventListener('click', showNext)

prevButton.addEventListener('click', showPrev)

autoPlayButton.addEventListener('click', handleAutoPlay)

function displayImage(idx = 0) {
  let url = images[idx].url
  carouselTrack.style.backgroundImage = `url(${url})`
  carouselTrack.classList.add('carousel-slide')
  caption.textContent = images[idx].caption

  indicators.forEach((indicator) => {
    if(indicator.id == idx){
      indicator.classList.add('active')
    }else {
      indicator.classList.remove('active')
    }
  })

}

function showNext() {
  currIdx = (length + currIdx + 1) % length
  displayImage(currIdx)
}

function showPrev() {
  currIdx = (length + currIdx - 1) % length
  displayImage(currIdx)
}

let intervalId, timeoutId;
function handleAutoPlay() {

  if(intervalId || timeoutId) {
    timerDisplay.textContent = ''
    autoPlayButton.textContent = 'Start Auto Play'
    clearInterval(intervalId)
    clearTimeout(timeoutId)
    intervalId = undefined
    timeoutId = undefined
    return
  }
  
  autoPlayButton.textContent = 'Stop Auto Play'
  
  startAutoPlay(intervalId)
  
}

function startAutoPlay() {
  let timeRemaning = 4
  
  timerDisplay.textContent = `Next slide in 5s`
  intervalId = setInterval(() => {
    timerDisplay.textContent = `Next slide in ${timeRemaning}s`
    timeRemaning--
  }, 1000)
  
  timeoutId = setTimeout(() => {
    showNext()
    clearInterval(intervalId)
    startAutoPlay()
  }, 5000)
}

function createIndicators() {
  const indicator = document.createElement('div')
  indicator.classList.add('carousel-indicator')
  return indicator
}