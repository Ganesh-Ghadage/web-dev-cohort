const container = document.querySelector('.container')
const colorInpEle = document.getElementById('colorInput')
const colorCodeEle = document.getElementById('color-code')
const copyBtn = document.getElementById('copy-btn')
const compliColorEle = document.getElementById('complimentry-color')
const saveBtn = document.getElementById('save-btn')
const favouriteColors = document.getElementById('favourite-colors')


colorInpEle.addEventListener('input',  (e) => {
    let baseColorCode = e.target.value

    updateColorDisplay(baseColorCode)

    displayComplimentoryColor(baseColorCode)

})

copyBtn.addEventListener('click', () => {
    setClipboard(colorCodeEle.innerText)
    .then(() => {
        const copyTost = document.createElement('p')
        copyTost.textContent = 'Color Code Copied'
        copyTost.classList.add('tost')
        container.appendChild(copyTost)

        setTimeout(() => {
            container.removeChild(copyTost)
        }, 1000)
    })
    .catch(err => console.err("Code copy failed", err))
})

saveBtn.addEventListener('click', () => {
    const baseColor = colorCodeEle?.innerText;
    const [compColor] = generateComplimentoryColor(baseColor)

    savetoFavColor(baseColor, compColor)
})

function updateColorDisplay(color) {
    colorCodeEle.innerText = color;
    colorCodeEle.style.color = color;
}

function displayComplimentoryColor(color) {
    const compColors = generateComplimentoryColor(color)
    compliColorEle.innerHTML = ""; // clear previous colors

    compColors.forEach((compColor) => {
        const colorBox = document.createElement('div')
        colorBox.classList.add('color-box')
        colorBox.style.backgroundColor = compColor
        colorBox.title = compColor
        compliColorEle.appendChild(colorBox)
    })
}

function generateComplimentoryColor(color) {
    const base = parseInt(color.slice(1), 16)
    const compColor = (0xFFFFFF ^ base).toString(16)

    return [`#${compColor}`]
}

async function setClipboard(text) {
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
}

function savetoFavColor(baseColor, compColor) {
    const favColorBox = document.createElement('div')
    favColorBox.classList.add('fav-color-box')

    const favBaseColor = document.createElement('div')
    favBaseColor.classList.add('color-box')
    favBaseColor.style.backgroundColor = baseColor
    favBaseColor.title = baseColor
    favColorBox.appendChild(favBaseColor)
    
    const favCompColor = document.createElement('div')
    favCompColor.classList.add('color-box')
    favCompColor.style.backgroundColor = compColor
    favCompColor.title = compColor
    favColorBox.appendChild(favCompColor)

    favouriteColors.appendChild(favColorBox)
}