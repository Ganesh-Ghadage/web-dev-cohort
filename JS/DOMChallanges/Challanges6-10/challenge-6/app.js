const hourHand = document.querySelector('.hour')
const minuteHand = document.querySelector('.minute')
const secondHand = document.querySelector('.second')
const digitalClock = document.querySelector('.digital-clock')
const dateElement = document.querySelector('.date')

function updateClock() {
    const date = new Date()

    const hour = date.getHours() % 12 || 12
    const minute = date.getMinutes()
    const second = date.getSeconds()
    
    const secondDegree = second * (360 / 60) === 0 ? 360 : second * (360 / 60)
    const minuteDegree = (minute * (360 / 60))
    const hourDegree = (hour * (360 / 12)) + (minute * (30 / 60) )

    // console.log(secondDegree)

    hourHand.style.transform = `rotate(${hourDegree}deg)`
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`
    secondHand.style.transform = `rotate(${secondDegree}deg)`

    digitalClock.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const todayDate = date.toLocaleDateString(undefined, dateOptions);

    dateElement.textContent = todayDate

}

updateClock()

setInterval(updateClock, 1000)