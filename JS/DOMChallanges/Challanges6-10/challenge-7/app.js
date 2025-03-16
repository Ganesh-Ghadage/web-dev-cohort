const accordionItems = document.querySelectorAll('.accordion-item')

accordionItems.forEach((item, idx) => {
    item.childNodes[1].addEventListener('click', () => handleClick(idx))
    
})

function handleClick(index) {

    accordionItems.forEach((item, idx) => {
        if(index === idx) {
            item.classList.contains('active') ? item.classList.remove('active') : item.classList.add('active')
        }else {
            item.classList.remove('active')
        }
    })

    
}