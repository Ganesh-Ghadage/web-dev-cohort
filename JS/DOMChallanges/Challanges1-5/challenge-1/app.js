const bulb = document.getElementById('bulb')
const toggleButton = document.getElementById('toggleButton')
const statusP = document.getElementById('status')

toggleButton.addEventListener('click', () => {
    let status = statusP.textContent === 'Status: On' ? 'On' : 'Off'
    toggleTheme(status)
})

function toggleTheme(status) {
    if(status === 'Off'){
        bulb.classList.remove('off')
        document.body.classList.add('dark-mode')
        statusP.textContent = 'Status: On'
        toggleButton.textContent = 'Turn Off'
    } else {
        bulb.classList.add('off')
        document.body.classList.remove('dark-mode')
        statusP.textContent = 'Status: Off'
        toggleButton.textContent = 'Turn On'
    }
}

