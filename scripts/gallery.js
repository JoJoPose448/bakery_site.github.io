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
