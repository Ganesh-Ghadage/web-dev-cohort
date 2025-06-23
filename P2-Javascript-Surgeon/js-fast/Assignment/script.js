const body = document.querySelector('body')
const form = document.querySelector('form')
const btnDiv = document.querySelector('#btn-div')

const handleForm = function(e) {
    e.preventDefault()
    const color = e.target[0].value
    const button = document.createElement('button')

    function createButton() {
        if(color) {
            button.innerText = color
            button.style.backgroundColor = color
            btnDiv.appendChild(button)
        }

        return function (e) {
            body.style.backgroundColor = e.target.innerText
        }
    }
    
    e.target[0].value = ''

    const handleButton = createButton()

    button.onclick = handleButton
}


form.onsubmit = handleForm