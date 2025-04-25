import { listProducts } from "../scripts/delivery.js";

const gallery = document.querySelector(".gallery");

gallery.innerHTML = listProducts
  .map(
    (product) => 
        `<div class="product">
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p>${product.price}</p>
        </div>`
    
      )
  .join("");

const products = document.querySelectorAll('.product');
products.forEach((card, index) => {
    const delay = index * 200; 
    card.style.animationDelay = `${delay}ms`;
    console.log(card)
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.cart').classList.remove('show');
})

document.querySelector('.cart-btn').addEventListener('click', () => {
    let cart = []

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim().split('=')
        if (cookie[0] === 'cart') {
            cart = JSON.parse(decodeURIComponent(cookie[1]))
            console.log(cart)
        }
    }

    document.querySelector('.cart-container').innerHTML = cart
    .map((product) => {
        let item = listProducts.find(i => i.name === product.name);
        return item
            ? `<div class="cart-product">
                <img src="${item.image}" alt="${item.name}">
                <p class="product-name">${item.name}</p>
                <p>${product.quantity} шт</p>
                <p>${item.price * product.quantity} грн</p>
            </div>`
            : "";
    })
    .join("");



    document.querySelector('.cart').classList.add('show');
})


document.querySelectorAll('.btn-buy').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.display = 'none'
    btn.parentElement.querySelector('.product-quantity').style.display = 'flex'

    let name = btn.parentElement.querySelector('.product-name').textContent
    let quantity = 1
    let cart = []

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim().split('=')
        if (cookie[0] === 'cart') {
            cart = JSON.parse(decodeURIComponent(cookie[1]))
            console.log(cart)
        }
    }

    cart.push({
        name: name, 
        quantity: quantity
      }
    )

    console.log(cart)

    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; max-age=${60 * 60 * 24 * 30}`  
    cookies = document.cookie.split('; ');  
  })
})


document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    let cart = [];

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim().split('=');
      if (cookie[0] === 'cart') {
        cart = JSON.parse(decodeURIComponent(cookie[1]));
      }
    }

    const productName = btn.parentElement.parentElement.parentElement.querySelector('.product-name').textContent;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === productName) {
        cart[i].quantity++;
        btn.parentElement.parentElement.querySelector('span').innerHTML = cart[i].quantity;
        break;
      }
    }

    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; max-age=${60 * 60 * 24 * 30}`;

    cookies = document.cookie.split('; ');
  });
});


document.querySelectorAll('.btn-remove').forEach(btn => {
  btn.addEventListener('click', () => {
    let cart = [];

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim().split('=');
      if (cookie[0] === 'cart') {
        cart = JSON.parse(decodeURIComponent(cookie[1]));
      }
    }

    const productName = btn.parentElement.parentElement.parentElement.querySelector('.product-name').textContent;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === productName) {
        if (cart[i].quantity > 1) {
          cart[i].quantity--;
          btn.parentElement.parentElement.querySelector('span').innerHTML = cart[i].quantity;
        } else {
          cart.splice(i, 1);

          btn.parentElement.parentElement.style.display = 'none';
          btn.parentElement.parentElement.parentElement.querySelector('.btn-buy').style.display = 'block';
        }
        break;
      }
    }

    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; max-age=${60 * 60 * 24 * 30}`;

    cookies = document.cookie.split('; ');
  });
});


let cart = []
for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim().split('=')
    if (cookie[0] === 'cart') {
        cart = JSON.parse(decodeURIComponent(cookie[1]))
    }
}  

if(cart.length > 0) {
    document.querySelectorAll('.btn-buy').forEach(btn => {
        for(let i = 0; i < cart.length; i++) {
            if(btn.parentElement.querySelector('.product-name').textContent === cart[i].name) {
                btn.style.display = 'none'
                btn.parentElement.querySelector('.product-quantity').style.display = 'flex'
                btn.parentElement.querySelector('span').innerHTML = cart[i].quantity
            }
        }
    })
}