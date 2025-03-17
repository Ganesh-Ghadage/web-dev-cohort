const limit = 200

const textInput = document.getElementById('textInput')
const charCountDisplay = document.getElementById('charCount')
const wordCountDisplay = document.getElementById('wordCount')
const uniqueWordCountDisplay = document.getElementById('uniqueWordCount')
const warningDisplay = document.getElementById('warningDisplay')

textInput.addEventListener('input', (e) => checkCharLength(e))

function checkCharLength(e) {
    let textLength = e.target.value.length
    let words = e.target.value.trim().toLowerCase().split(' ')
    let uniqueWords = words.filter((word, idx) => words.indexOf(word) === idx)
    
    warningDisplay.textContent = ``
    charCountDisplay.textContent = `${textLength} / ${limit} character`
    wordCountDisplay.textContent = `${words.length} Words`
    uniqueWordCountDisplay.textContent = `${uniqueWords.length} Unique Words`
    
    if(textLength < limit){
        charCountDisplay.style.color = 'green'
    }else if(textLength === limit){
        charCountDisplay.style.color = 'orange'
    } else {
        charCountDisplay.style.color = 'red'
        warningDisplay.textContent = `You exceed the text limit`
    }

}