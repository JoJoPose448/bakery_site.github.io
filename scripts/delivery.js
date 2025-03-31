let phone_input = document.querySelector('#phone');
let orderContainer = document.querySelector('.order-container')
let deliveryContainer = document.querySelector('.delivery')
let productsContainer = document.querySelector('.products-container')
let orderCardContainer = document.querySelector('.order-card-container')
let productsCardContainer = document.querySelector('.products-card-container')

let cookies = document.cookie.split('; ');

let cost = 0

export const listProducts = [
    {
        "image": "../images/Croissants.png",
        "price": 100,
        name: "Круасан"
    },
    {
        "image": "../images/bread.png",
        "price": 50,
        name: "Булочка"
    },
    {
        "image": "../images/baguette.png",
        "price": 80,
        name: "Багет"
    },
    {
        "image": "../images/pancakes.png",
        "price": 175,
        name: "Млинці"
    },
    {
        "image": "../images/sirniki.png",
        "price": 175,
        name: "Сирники"
    },
    {
        "image": "../images/suhariki.png",
        "price": 100,
        name: "Сухарики"
    },
    {
        "image": "../images/pirizhochok.png",
        "price": 40,
        name: "Пиріжок"
    },
]

try {

function createProductCard(product, name, quantity) {
    orderCardContainer.innerHTML += `<div class="order-card" id="product${name}" quantity="${quantity}"><img src="${product.image}" alt="Image">${product.name}<p>${quantity}шт</p> <p>${product.price}грн</p></div>`
    anime({
        targets: `#product${name}`,
        translateX: [window.innerWidth * 50/100, 0],
        duration: 400,
        ease: 'linear'
    })
}



phone_input.addEventListener('input', () => {
    if (!phone_input.value.startsWith("+380")) {
        phone_input.value = "+380";
    }

    phone_input.value = "+380" + phone_input.value.replace(/\D/g, "").slice(3);
});

document.querySelector('.order-btn').addEventListener('click', () => {
    deliveryContainer.style.filter = 'blur(2px)';
    orderContainer.style.filter = 'blur(2px)';
    deliveryContainer.style.pointerEvents = 'none';
    orderContainer.style.pointerEvents = 'none';

    productsContainer.style.opacity = '1';
    productsContainer.style.pointerEvents = 'all';
})

productsContainer.querySelector('.back-btn').addEventListener('click', () => {
    deliveryContainer.style.filter = 'none';
    orderContainer.style.filter = 'none';
    deliveryContainer.style.pointerEvents = 'all';
    orderContainer.style.pointerEvents = 'all';

    productsContainer.style.opacity = '0';
    productsContainer.style.pointerEvents = 'none';
})

document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        deliveryContainer.style.filter = 'none';
        orderContainer.style.filter = 'none';
        deliveryContainer.style.pointerEvents = 'all';
        orderContainer.style.pointerEvents = 'all';

        productsContainer.style.opacity = '0';
        productsContainer.style.pointerEvents = 'none';
    }
})


for (let i = 0; i < listProducts.length; i++) {
    productsCardContainer.innerHTML += `<div class="products-card" name="${i}"><img src="${listProducts[i].image}" alt="Image">${listProducts[i].name} <input type="number" min="1" placeholder="Кількість"> <p>${listProducts[i].price}грн</p><div class="add-btn"><div class="line line1"></div><div class="line line2"></div></div></div>`
}

document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if(!btn.parentElement.classList.contains('selected')) {
            if(btn.parentElement.querySelector('input').value == '') {
                alert('Введіть кількість')
                document.querySelector(`#product${btn.parentElement.getAttribute('name')}`).querySelector('input').style.border = '2px solid red'
                return                
            } else if (btn.parentElement.querySelector('input').value < 1) {
                alert('Кількість не може бути меншою ніж 1')
                document.querySelector(`#product${btn.parentElement.getAttribute('name')}`).querySelector('input').style.border = '2px solid red'
                return
            } else if (Math.floor(btn.parentElement.querySelector('input').value) != btn.parentElement.querySelector('input').value) {
                alert('Кількість повинна бути цілим числом')
                document.querySelector(`#product${btn.parentElement.getAttribute('name')}`).querySelector('input').style.border = '2px solid red'
                return
            }

            btn.parentElement.classList.add('selected')
            cost += listProducts[btn.parentElement.getAttribute('name')].price * btn.parentElement.querySelector('input').value
            createProductCard(listProducts[btn.parentElement.getAttribute('name')], btn.parentElement.getAttribute('name'), btn.parentElement.querySelector('input').value)
        
            let cart = []

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim().split('=')
                if (cookie[0] === 'cart') {
                    cart = JSON.parse(decodeURIComponent(cookie[1]))
                    console.log(cart)
                }
            }

            cart.push({
                name: listProducts[btn.parentElement.getAttribute('name')].name,
                quantity: btn.parentElement.querySelector('input').value
            })

            document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; max-age=${60 * 60 * 24 * 30}`  
            cookies = document.cookie.split('; ');
        } else {
            btn.parentElement.classList.remove('selected')
            cost -= listProducts[btn.parentElement.getAttribute('name')].price * document.querySelector(`#product${btn.parentElement.getAttribute('name')}`).getAttribute('quantity')
            document.querySelector(`#product${btn.parentElement.getAttribute('name')}`).remove()

            let cart = []

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim().split('=')
                if (cookie[0] === 'cart') {
                    cart = JSON.parse(decodeURIComponent(cookie[1]))
                    console.log(cart)
                }
            }

            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name === listProducts[btn.parentElement.getAttribute('name')].name) {
                    cart.splice(i, 1)
                    break
                }
            }

            document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; max-age=${60 * 60 * 24 * 30}`  
            cookies = document.cookie.split('; ');
        }
        document.querySelector('.price').innerText = cost + 'грн'
    })

})

document.querySelector('.delivery-form').querySelector('button').addEventListener('click', () => {
    let flag = false
    document.querySelectorAll('.delivery-form input').forEach(input => {
        if (input.value.startsWith('+380')) {
            if (input.value.length != 13) {
                input.style.border = '2px solid red'
                flag = true
                return
            }
        }
        if (input.value == '' || input.value == '+380') {
            input.style.border = '2px solid red'
            flag = true
            return 
        } 
    })

    if(document.querySelector('.order-container').innerHTML == '') {
        alert('Ваше замовлення порожнє!')
    }
    

    if (flag) {
        alert('Заповніть всі поля!')
    } else {
        window.location.href = 'thanks.html'
    }
})

document.querySelector('.delivery-form').querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        input.style.border = '1px solid #FFBE55'
    })
})

document.querySelector('.show-order').addEventListener('click', () => {
    if (document.querySelector('.order-container').style.display == 'none') {
        document.querySelector('.order-container').style.display = 'flex'
    } else {
        document.querySelector('.order-container').style.display = 'none'
    }
})

productsContainer.querySelectorAll('.products-card').forEach(card => {
    card.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.style.border = '1px solid #000'
        })
    })
})

orderContainer.querySelector('.back-btn').addEventListener('click', () => {
    orderContainer.style.display = 'none'
})

let cart = []

for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim().split('=');
    if (cookie[0] === 'cart') {
        cart = JSON.parse(decodeURIComponent(cookie[1]));
    }
}

for(let i = 0; i < cart.length; i++) {
    for(let j = 0; j < listProducts.length; j++) { 
        if(listProducts[j].name == cart[i].name) {
            createProductCard(listProducts[j], j, cart[i].quantity)

            document.querySelector(`.products-card[name="${j}"]`).querySelector('input').value = cart[i].quantity
            document.querySelector(`.products-card[name="${j}"]`).classList.add('selected')

            cost += listProducts[j].price * cart[i].quantity
            document.querySelector('.price').innerText = cost + 'грн'
        }
    }
}

document.querySelectorAll('.order-card').forEach(card => {
    card.style.transform = 'translateY(0px)'
})

} 
catch (error) {
    console.warn('Если ты на странице gallery то всё ок! И ошибка ниже не та!')
    console.error(error)
}