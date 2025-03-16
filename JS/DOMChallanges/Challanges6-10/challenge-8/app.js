const cartItems = document.getElementById('cart-items')
const totalPriceDisplay = document.querySelector('#cart-total h3')
const emptyCartDiv = document.querySelector('.empty-cart')

let cart = {}

function updateDisplayItems() {
    cartItems.innerHTML = ''

    let totalPrice = 0

    if(Object.keys(cart).length === 0) {
        cartItems.appendChild(emptyCartDiv)
    } else {
        for (let item in cart) {

            const itemDiv = document.createElement('div')
    
            itemDiv.innerHTML = `
            <div style="display: flex; line-height: 0px; margin-bottom: 5px;">
              <p style="width: 100%;">${item}</p>
              <div style="display: flex; gap: 10px;">
                <button class="quantity-controls" onClick="decreaseQuantity('${item}')">-</button>
                <p>${cart[item].quantity}</p>
                <button class="quantity-controls" onClick="increaseQuantity('${item}')">+</button>
                <p>$${cart[item].price}</p>
                <button onClick="removeFromCart('${item}')">Remove</button>
              </div>
            </div>`
    
            cartItems.appendChild(itemDiv)
    
            totalPrice += cart[item].quantity * cart[item].price
        }
    }

    totalPriceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`
}

function addToCart(productName, price){
    if(cart[productName]) return

    cart[productName] = {
        quantity: 1,
        price
    }

    updateDisplayItems()
}

function removeFromCart(productName) {
    delete cart[productName]

    updateDisplayItems()
}

function increaseQuantity(productName) {
    if(!cart[productName]) return

    cart[productName].quantity += 1
    
    updateDisplayItems()
}

function decreaseQuantity(productName) {
    if(!cart[productName]) return
    
    cart[productName].quantity -= 1
    
    if(cart[productName].quantity <= 0) {
        removeFromCart(productName)
    }

    updateDisplayItems()
}

