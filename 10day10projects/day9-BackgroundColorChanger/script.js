const changeBtn = document.getElementById('changeBtn')

changeBtn.addEventListener('click', changeBGColor)

function changeBGColor() {
    const randomColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

    document.body.style.backgroundColor = randomColor
}