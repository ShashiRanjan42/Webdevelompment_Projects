const bar = document.getElementById('bar');
const navbar = document.getElementById('navbar');
const close = document.getElementById('close');

if(bar)
{
    bar.addEventListener('click',()=>
    {
        navbar.classList.add('active');
    })
}
if(close)
{
    close.addEventListener('click',()=>
    {
        navbar.classList.remove('active');
    })
}

let cartIcon = document.querySelector('.cartt-icon');
let cartt = document.querySelector('.cartt');
let closeCart = document.querySelector('#cartt-close');
//for open
cartIcon.onclick = () =>{
    cartt.classList.add("active");
}

// for Close
closeCart.onclick = () =>{
    cartt.classList.remove("active");
}

// for phone
let carttIcon = document.querySelector('.carttt-icon');
carttIcon.onclick = () =>{
    cartt.classList.add("active");
}
// cart working js
// if(document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded',ready)
// }
// else{
//     ready();
// }

// function ready(){
//     //remove items from cart
//     var removecartbutton = document.getElementsByClassName('cart-remove')
//     console.log('removecartbutton')
//     for(var i = 0; i < removecartbutton.length; i++)
//     {
//         var button = removecartbutton[i]
//         //var button = removecart-row[i]
//         button.addEventListener("click", removecartItem)
//     }
// }

// function removecartItem(event){
//     var buttonClicked = event.target;
//     //buttonClicked.parentElement.remove();
//     buttonClicked.document.getElementsByClassName('cart-row').remove();

// }

// cart working

// function addtocart(e){
//     var button = e.target;
//     var cartItem = button.parentElement
//     var price = cartItem.getElementsByClassName('shirt-price')[0].innerText
//     console.log(price)
    
//     // let newrow = document.createElement('row')
//     // newrow.classrow.add('row-group-item')
//     // newrow.textContent = currentInput.value

//     // let parentElement = document.getElementById('parent-row');
//     // parent-HTMLTableRowElement.appendChild(newrow)
// }


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// function addToCartClicked(event) {
//     var button = event.target
//     var shopItem = button.parentElement.parentElement
//     var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//     var shopItem2 = button.parentElement
//     var title = shopItem2.getElementsByClassName('shop-item-title')[0].innerText
//     var price = shopItem2.getElementsByClassName('shop-item-price')[0].innerText
//     addItemToCart(title, price, imageSrc)
//     updateCartTotal()
// }

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement 
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imageSrc} width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column"><i class="fa-solid fa-rupee-sign"></i> ${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn-remove  btn-danger" type="button" style=" margin-bottom: 5%;">REMOVE</button>
                </div> `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs'+' ' + total
}