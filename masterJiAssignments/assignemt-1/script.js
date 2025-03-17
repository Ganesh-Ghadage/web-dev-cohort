const moodInput = document.querySelectorAll('.moodInput')
const noteInput = document.getElementById('noteInput')
const moodDisplay = document.getElementById('moodDisplay')
const noteDisplay = document.getElementById('noteDisplay')
const form = document.querySelector("form");

const today = new Date().toLocaleDateString();
let mood = {date: today};

// get moodHistory and todays mood from local storage
const moodHistory = JSON.parse(localStorage.getItem('moodHistory'))
const savedTodaysMood = JSON.parse(localStorage.getItem('moodToday'))

// to display users save mood if user has saved mood for today
if(savedTodaysMood){
    moodDisplay.textContent = savedTodaysMood?.mood
    noteDisplay.textContent = savedTodaysMood?.note
}


form.addEventListener('submit', (event) => getFormData(event))

// to handle the mood form data
function getFormData(event) {
    event.preventDefault();
    const data = new FormData(form);
    for (const entry of data) {
        mood[entry[0]] = entry[1]
    }
    
    // store the mood data and mood history data in local storage
    moodHistory[today] = mood
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory))
    localStorage.setItem('moodToday', JSON.stringify(mood))

    // remove checked attribute from mood input radio button 
    moodInput.forEach((item) => item.checked = false)
    
    noteInput.value = ''

    // display the users mood
    moodDisplay.textContent = mood.mood
    noteDisplay.textContent = mood.note
}

// // to update the mood display by clicking on Mood Input Radio Buttons
// moodInput.forEach((item) => {
//     item.addEventListener('click', () => {
//         moodDisplay.textContent = item.value
//     })
// })