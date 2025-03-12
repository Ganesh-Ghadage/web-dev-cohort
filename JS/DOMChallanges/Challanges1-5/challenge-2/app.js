const mainHeading = document.getElementById('mainHeading')
const colorButtons = document.querySelector(".color-buttons")

colorButtons.childNodes.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(e.target.innerText === 'Reset'){
            mainHeading.style.color = ''
            return
        }
        mainHeading.style.color = e.target.innerText
    })
});

