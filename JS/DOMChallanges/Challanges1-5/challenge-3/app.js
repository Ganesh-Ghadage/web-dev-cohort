const nameInput = document.getElementById('nameInput')
const jobInput = document.getElementById('jobInput')
const ageInput = document.getElementById('ageInput')
const bioInput = document.getElementById('bioInput')
const nameDisplay = document.getElementById('nameDisplay')
const jobDisplay = document.getElementById('jobDisplay')
const ageDisplay = document.getElementById('ageDisplay')
const bioDisplay = document.getElementById('bioDisplay')

nameInput.addEventListener('input', (e) => {
    nameDisplay.textContent = e.target.value || 'Not provided'
})

jobInput.addEventListener('input', (e) => {
    jobDisplay.textContent = e.target.value || 'Not provided'
})

ageInput.addEventListener('input', (e) => {
    ageDisplay.textContent = e.target.value || 'Not provided'
})

bioInput.addEventListener('input', (e) => {
    bioDisplay.textContent = e.target.value || 'Not provided'
})
