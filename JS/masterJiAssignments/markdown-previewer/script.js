const textArea = document.querySelector('.textArea')
const previweArea = document.querySelector('.previweArea')
const clearBtn = document.getElementById('clearBtn')
const mdCopyBtn = document.getElementById('mdCopyBtn')
const htmlCopyBtn = document.getElementById('htmlCopyBtn')
const container = document.querySelector('.container')

textArea.addEventListener('input', (event) => {
    // let pasesedHTML = markdownToHtml(event.target.value)
    // previweArea.innerHTML = pasesedHTML

    let mdContent = event.target.value
    let pasesedHTML = marked.parse(mdContent)
    previweArea.innerHTML = pasesedHTML
})

clearBtn.addEventListener('click', () => {
    textArea.value = ''
    previweArea.innerHTML = ''
})

mdCopyBtn.addEventListener('click', (e) => {
    if(!textArea.value) {
        return
    }

    // set quote to clipboard using setClipboard() function
    setClipboard(textArea.value)
    .then(() => createTost(e, 'Markdown Copied'))
    .catch(err => console.error("copy failed", err))
})

htmlCopyBtn.addEventListener('click', (e) => {
    if(!previweArea.innerHTML){
        return
    }

    // set quote to clipboard using setClipboard() function
    setClipboard(previweArea.innerHTML)
    .then(() => createTost(e, 'HTML Copied'))
    .catch(err => console.error("copy failed", err))
})

// create setClipboard() function
async function setClipboard(text) {
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
}

// function to create TOST message
function createTost(event, message) {
    const copyTost = document.createElement('p')
    copyTost.textContent = message
    copyTost.classList.add('tost')
    copyTost.style.top = `${event.clientY - 60}px`
    copyTost.style.left = `${event.clientX - 70}px`

    container.appendChild(copyTost)

    // remove Quote Copied tost message after 1s
    setTimeout(() => {
        container.removeChild(copyTost)
    }, 1000)
}

/*
 I tried crating md to html converter from scratch but there are lots of fine tunning challanges
 so I used marked.js library, to save time for a myself
 below is my approch for it, I was able to create h1-h6, bold, italic, link, blockqote, inline code
 but had a problem with Ordered list, and block code
*/
function markdownToHtml(mdText) {
    const toHTML = mdText.split("\n").map(text => 
        text
        .trim() // using trim method to remove whitespace
        .replace(/^###### (.*$)/i, "<h3>$1</h3>") // h6 tag
        .replace(/^##### (.*$)/i, "<h3>$1</h3>") // h5 tag
        .replace(/^#### (.*$)/i, "<h3>$1</h3>") // h4 tag
        .replace(/^### (.*$)/i, "<h3>$1</h3>") // h3 tag
        .replace(/^## (.*$)/i, "<h2>$1</h2>") // h2 tag
        .replace(/^# (.*$)/i, "<h1>$1</h1>") // h1 tag
        .replace(/^[\*\-] (.*$)/i, "<li>$1</li>") // <li> tag unordered list
        .replace(/^\d.\ (.*$)/i, "<ol><li>$1</li></ol>") // <li> tag ordered list
        .replace(/\*\*(.*)\*\*/i, "<b>$1</b>") // bold text
        .replace(/\*(.*)\*/i, "<i>$1</i>") // italic text
        .replace(/^> (.*$)/i, "<blockquote><p>$1</p></blockquote>") // quote
        .replace(/\[(.*?)\]\((.*?)\)/i, "<a href='$2' target='_blank' >$1</a>") // link
        .replace(/\`(.*)\`/i, "<code>$1</code>") // inline code
        .replace(/\```(.*)\```/i, "<code>$1</code>") // block code
    )
    return toHTML.join("\n")
}
