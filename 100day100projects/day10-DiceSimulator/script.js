const dice = document.getElementById('dice')
const rollButton = document.getElementById('rollButton')
const resultMessage = document.getElementById('resultMessage')

rollButton.addEventListener('click', rollDice)

const diceFaces = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;']

function rollDice() {
    const result = Math.ceil(Math.random() * 6)

    console.log(result)

    dice.innerHTML = diceFaces[result - 1]

    resultMessage.textContent = `You Rolled ${result}`
}