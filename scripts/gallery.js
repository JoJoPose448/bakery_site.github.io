import { listProducts } from "./delivery";

const gallery = document.querySelector(".gallery");

gallery.innerHTML = listProducts
  .map(
    (product) => 
        `<div class="product">
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name}</p>
            <p>${product.price}</p>
        </div>`
    
  )
  .join("");
