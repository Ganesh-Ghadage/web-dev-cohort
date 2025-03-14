const firstNumber = document.getElementById('firstNumber')
const secondNumber = document.getElementById('secondNumber')
const operationButtons = document.querySelectorAll('.operations')
const result = document.getElementById('result')

operationButtons.forEach((button) => {
    button.addEventListener('click', performOperation)
})

function performOperation() {
    const num1 = parseInt(firstNumber.value.trim())
    const num2 = parseInt(secondNumber.value.trim())

    if(isNaN(num1) || isNaN(num2) || !num1 || !num2) {
        result.textContent = 'Enter Valid Numbers'
        result.style.color = 'red'
        return
    }

    const operation = this.textContent.trim()

    switch (operation) {
        case '+':
            result.textContent = `Result: ${num1 + num2}`
            result.style.color = ''
        break;
        case '-':
            result.textContent = `Result: ${num1 - num2}`
            result.style.color = ''
        break;
        case '*':
            result.textContent = `Result: ${num1 * num2}`
            result.style.color = ''
        break;
        case '/':
            result.textContent = `Result: ${num1 / num2}`
            result.style.color = ''
        break;
    
        default:
            break;
    }

}