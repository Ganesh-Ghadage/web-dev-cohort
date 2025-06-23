const moodInput = document.querySelectorAll('.moodInput')
const noteInput = document.getElementById('noteInput')
const moodDisplay = document.getElementById('moodDisplay')
const noteDisplay = document.getElementById('noteDisplay')
const form = document.querySelector("form");

const today = new Date().toLocaleDateString();
let mood = {date: today};

// get moodHistory and todays mood from local storage
let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || {};
let savedTodaysMood = JSON.parse(localStorage.getItem('moodToday')) || {}

// Ensure moodHistory is an object before assigning properties
if (typeof moodHistory !== "object" || moodHistory === null) {
    moodHistory = {}; // Reset to an empty object
}

// Ensure savedTodaysMood is an object before assigning properties
if (typeof savedTodaysMood !== "object" || savedTodaysMood === null) {
    savedTodaysMood = {}; // Reset to an empty object
}

// to display users save mood if user has saved mood for today
if(savedTodaysMood){
    moodDisplay.textContent = savedTodaysMood?.mood || 'Select Mood'
    noteDisplay.textContent = savedTodaysMood?.note || 'Add a note'
}

// event listener to handle form submit event
form.addEventListener('submit', (event) => getFormData(event))

// to handle the mood form data
function getFormData(event) {
    event.preventDefault();

    // format the form data into object
    const data = new FormData(form);
    for (const entry of data) {
        mood[entry[0]] = entry[1]
    }
    
    // store the mood data and mood history data in local storage
    moodHistory[today] = mood
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory))
    localStorage.setItem('moodToday', JSON.stringify(mood))

    // reset form values to original
    moodInput.forEach((item) => item.checked = false)
    noteInput.value = ''

    // display the users mood
    moodDisplay.textContent = mood.mood
    noteDisplay.textContent = mood.note
}