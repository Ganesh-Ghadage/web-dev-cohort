const togglebtn = document.querySelector('.toggle-btn')
const panel = document.querySelector('.panel')
const closebtn = document.querySelector('.close-btn')
const menuItems = document.querySelectorAll('.menu-item')

let isOpen = false

togglebtn.addEventListener('click', togglePanel)

closebtn.addEventListener('click', togglePanel)

document.addEventListener('click', (e) => handleDocClick(e))

menuItems.forEach((item) => {
    item.addEventListener('click', () => alert(item.textContent))
})

function togglePanel() {
    if(!isOpen){
        panel.style.right = '0'
        isOpen = true
    } else {
        panel.style.right = '-360px'
        isOpen = false
    }
}

function handleDocClick(e) {
    if(isOpen && e.target !== togglebtn){
        if(e.target === panel || e.target.parentNode === panel) {
            return
        }else {
            panel.style.right = '-360px'
            isOpen = false
        }
    }
    
}