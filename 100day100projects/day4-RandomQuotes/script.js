const quoteDisplay = document.getElementById('quoteDisplay')
const authorDisplay = document.getElementById('authorDisplay')
const generateBtn = document.getElementById('generateBtn')

const quotes = [
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
    { quote: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "We may encounter many defeats but we must not be defeated.", author: "Maya Angelou" },
    { quote: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
    { quote: "If you can dream it, you can do it.", author: "Walt Disney" },
    { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
    { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
    { quote: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
    { quote: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
    { quote: "It is never too late to be what you might have been.", author: "George Eliot" },
    { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" }
];

generateBtn.addEventListener('click', generateRandomQuote)

let prevIds = []

function generateRandomQuote() {
    let randomId = generateRandomId()
    console.log('id', randomId)
    
    const randomQuote = quotes[randomId]

    quoteDisplay.textContent = randomQuote.quote
    authorDisplay.textContent = `- ${randomQuote.author}`

    prevIds.push(randomId)
    console.log('previd', prevIds)
}
  
function generateRandomId() {
    let randomId = Math.floor(Math.random() * quotes.length)

    if(prevIds.includes(randomId)) {
        if(prevIds.length === quotes.length) {
            prevIds = []
        }
        console.log('in recursion')
        return generateRandomId()
    }

    return randomId
}