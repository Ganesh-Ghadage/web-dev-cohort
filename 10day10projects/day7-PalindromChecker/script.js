const textInput = document.getElementById('textInput')
const checkButton = document.getElementById('checkButton')
const resultDisplay = document.getElementById('resultDisplay')

const checkPalindrom = () => {
    const text = textInput.value.trim()

    if(!text){
        resultDisplay.textContent = "Please enter some text"
        return
    }

    const checkText = text.toLowerCase().replaceAll(' ', '')
    // console.log(checkText)

    for(let i = 0; i < (checkText.length / 2); i++){
        if(checkText.charAt(i) !== checkText.charAt(checkText.length - i - 1)){
            resultDisplay.textContent = `${text} is not a palindrom`
            resultDisplay.style.color = 'red'
            return
        }
    }

    resultDisplay.textContent = `${text} is a palindrom`
    resultDisplay.style.color = 'green'

    textInput.value = ''
}

const checkPalindromNewApproch = () => {
    const text = textInput.value.toLowerCase().replace(/[^a-z09]/g, '')
    
    if(!text){
        resultDisplay.textContent = "Please enter some text"
        return
    }
    
    const reverseText = text.split('').reverse().join('')
    
    if(text === reverseText){
        resultDisplay.textContent = `${textInput.value} is a palindrom`
        resultDisplay.style.color = 'green'
    } else {
        resultDisplay.textContent = `${textInput.value} is not a palindrom`
        resultDisplay.style.color = 'red'
    }
    
    textInput.value = ''
}

checkButton.addEventListener('click', checkPalindromNewApproch)