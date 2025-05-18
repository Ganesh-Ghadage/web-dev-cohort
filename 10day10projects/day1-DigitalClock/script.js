function updateClock() {
    const timeElement = document.getElementById('time')
    const dateElement = document.getElementById('date')

    const dateTime = new Date()

    const hours = dateTime.getHours() % 12 || 12;
    const minutes = dateTime.getMinutes().toString().padStart(2, '0')
    const seconds = dateTime.getSeconds().toString().padStart(2, '0')
    const ampm = dateTime.getHours() >= 12 ? 'PM' : 'AM'

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const date = dateTime.toLocaleDateString(undefined, dateOptions);

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`
    dateElement.textContent = date
}

setInterval(updateClock, 1000)

updateClock()