const timeInputElement = document.getElementById('timeInput')
const startButtonElement = document.getElementById('startButton')
const countdownTimeElement = document.getElementById('timeLeft')
const container = document.querySelector('.container')

function startCountdown() {
    let time = parseInt(timeInputElement.value)
    let timeStatus = ''
    let intervalId;
    
    if(intervalId || !time) return
    
    if(isNaN(time)){
        countdownTimeElement.innerText = 'Please enter valid time'
    }
    
    if(time <= 0){
        countdownTimeElement.innerText = 'Time should be greater than 0'
    }
    
    countdownTimeElement.innerText = `Starting Timer ⏱️ of ${time} seconds`
    
    intervalId = setInterval(() => {
        time--;
        countdownTimeElement.textContent = `Time remaining: ${time}`;

        if(time <= 0){
            countdownTimeElement.textContent = 'Time up ⏰'
            container.removeChild(pauseResumeButton)
            clearInterval(intervalId)
        }
    }, 1000)

    timeStatus = 'running'

    timeInputElement.value = ''

    pauseResumeButton = document.createElement('button')
    pauseResumeButton.innerText = 'Pause Timer'
    container.appendChild(pauseResumeButton)

    function pauseResumeCountdown() {
        if(timeStatus === 'running') {
            pauseResumeButton.innerText = 'Resume Timer'

            clearInterval(intervalId)

            timeStatus = 'stopped'
        }else if(timeStatus === 'stopped') {
            pauseResumeButton.innerText = 'Pause Timer'

            intervalId = setInterval(() => {
                time--;
                countdownTimeElement.textContent = `Time remaining: ${time}`;
        
                if(time <= 0){
                    countdownTimeElement.textContent = 'Time up ⏰'
                    container.removeChild(pauseResumeButton)
                    clearInterval(intervalId)
                }
            }, 1000)

            timeStatus = 'running'
        }
    }

    pauseResumeButton.addEventListener('click', pauseResumeCountdown)

}


startButtonElement.addEventListener('click', startCountdown)



