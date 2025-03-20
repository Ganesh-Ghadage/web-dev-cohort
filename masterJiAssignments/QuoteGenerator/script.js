// function to fetch random Quote
async function fetchRandomQuote() {
    const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    try {
        let responce = await fetch(url, options)
        let data = await responce.json()
        return data.data
    } catch (error) {
        console.log('Error while fetching data ', error)
        return null
    }
}

// Sample image array
const images = [
    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&w=800",
    "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&w=800",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&w=800",
    "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&w=800",
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&w=800",
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&w=800",
    "https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&w=800",
    "https://images.unsplash.com/photo-1502865787650-3f8318917153?auto=format&w=800",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&w=800",
    "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&w=800",
    "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&w=800",
    "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?auto=format&w=800",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&w=800",
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&w=800",
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&w=800",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&w=800",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&w=800",
    "https://images.unsplash.com/photo-1429704658776-3d38c9990511?auto=format&w=800",
    "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?auto=format&w=800",
    "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?auto=format&w=800",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&w=800"
]
  
// get required elements
const container = document.querySelector('.container')
const quoteDisplay = document.getElementById('quoteDisplay')
const authorDisplay = document.getElementById('authorDisplay')
const generateBtn = document.getElementById('generateBtn')
const copyBtn = document.getElementById('copyBtn')
const shareBtn = document.getElementById('shareBtn')
const exportBtn = document.getElementById('exportBtn')

// Event listener to generate random quote
generateBtn.addEventListener('click', fetchAndUseQuote)

// Event listener to copy Quote
copyBtn.addEventListener('click', (e) => {
    // set quote to clipboard using setClipboard() function
    setClipboard(quoteDisplay.textContent)
    .then(() => {
        // once quote is copied to clipboard display Quote Copied tost message
        const copyTost = document.createElement('p')
        copyTost.textContent = 'Quote Copied'
        copyTost.classList.add('tost')
        copyTost.style.top = `${e.clientY - 60}px`
        copyTost.style.left = `${e.clientX - 70}px`

        container.appendChild(copyTost)

        // remove Quote Copied tost message after 1s
        setTimeout(() => {
            container.removeChild(copyTost)
        }, 1000)
    })
    .catch(err => console.err("Code copy failed", err))
})

// Event listener to download text and image
exportBtn.addEventListener('click', () => {
    downloadImage(randomImage)
    downloadQuote(quote)
})

// initilize required global variables
let randomImage = ''
let quote = ''
let prevIds = []

// main function to fetch and use Quote
async function fetchAndUseQuote() {
    quote = await fetchRandomQuote()

    // generate random Id to get random quote
    let randomId = generateRandomId()
    
    // get random image based on random image
    randomImage = images[randomId]

    // display quote 
    quoteDisplay.textContent = quote.content
    authorDisplay.textContent = `- ${quote.author}`

    // add href to share button to post it on twitter as per twitter offical page
    shareBtn.children[0].href = `https://twitter.com/intent/tweet?text=${quote.content}`

    // set random background image url
    randomImage ? document.body.style.backgroundImage = `url(${randomImage})` : ''

    // push random id to prevIds array
    prevIds.push(randomId)
}

// create setClipboard() function
async function setClipboard(text) {
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
}

// function to generate random Id
// This function will ensure no Id is repeated unless all images is covered
function generateRandomId() {
    let randomId = Math.floor(Math.random() * images.length)

    if(prevIds.includes(randomId)) {
        if(prevIds.length === images.length) {
            prevIds = []
        }

        return generateRandomId()
    }

    return randomId
}

// function to download image
function downloadImage(imageUrl) {
    // fetch the image from our url
    fetch(imageUrl)
        .then((response) => {
            // return response in blob format
            return response.blob()
        })
        .then((blob) => {
            // Create an object URL from blob
            const url = URL.createObjectURL(blob)

            // Create "a" element
            const link = document.createElement('a')
            link.href = url // Set "a" element link
            link.download = 'img.png' // Set download filename
            link.click() // Start downloading

            URL.revokeObjectURL(url) // remove an object URL
        })
        .catch(console.error)
}

// function to download quote as .txt file
function downloadQuote(text) {
    const quote = `${text.content} \n - ${text.author}`

    // Create "a" element
    const a = document.createElement('a') 
    // Create a blob (file-like object)
    const blob = new Blob([quote], {type: "text/plain"}) 

    // Create an object URL from blob
    const url = URL.createObjectURL(blob) 

    a.href = url // Set "a" element link
    a.download = quote.txt // Set download filename
    a.click() // Start downloading

    URL.revokeObjectURL(url) // remove an object URL
}

// first function call to ensure quote is displayed once page is loaded
fetchAndUseQuote()