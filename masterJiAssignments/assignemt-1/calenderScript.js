// fetch mood history from local storage
const moodHistory = JSON.parse(localStorage.getItem('moodHistory'))

// referance arrays to get color data as per mood
const moods = ["Happy 😄", "Sad 😔", "Angry 😡", "Tired 😴", "Excited 🤩"]
const colors = ['#FFD70085', '#5D87A185', '#D32F2F85', '#4B386985', '#FF6F0085']

const events = []

// creating enent arraay as per library norms to display it on calender
for(date in moodHistory) {
    const event = {
        title: moodHistory[date].mood,
        start: new Date(date),
        backgroundColor: colors[moods.indexOf(moodHistory[date].mood)],
        textColor: '#000',
        borderColor: '#fff',
        allDay: true,
        extendedProps: moodHistory[date]?.note
    }

    events.push(event)
}


document.addEventListener('DOMContentLoaded', function() {
let calendarEl = document.getElementById('calendar');
let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        height: '80vh',
        events: [...events],
    });
    calendar.render();
});
