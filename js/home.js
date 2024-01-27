
import { products } from "../data.js";

const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const cardquantity = document.querySelector('.cardquantity');
let cart = {};


// add to cart functions
function addToCartIcon(productDetails) {
    const productId = productDetails.id;
    if (!cart[productId]) {
        if (!cart[productId]) {
            cart[productId] = {
                id: productDetails.id,
                name: productDetails.name,
                price: productDetails.price,
                image: productDetails.image,
                cardquantity: 1
            }
        }
    } else if (cart[productId].cardquantity >= productDetails.quantity) {
        console.log("Can't add more.");
    } else {
        cart[productId].cardquantity++;
    }
    saveCartToLocalStorage();
    reloadCard();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalprice = 0;

    for (const productId in cart) {
        const productDetails = cart[productId];

        totalprice += productDetails.price * productDetails.cardquantity;
        count += productDetails.cardquantity;

        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div>
          <img src="${productDetails.image}" />
        </div>
        <h2>${productDetails.name}</h2>
        <div class="plusevent">
          <span class="minus">-</span>
          <span class="num">${productDetails.cardquantity}</span>
          <span class="plus">+</span>
        </div>
        <p>$${productDetails.price * productDetails.cardquantity}</p>
        <button class="remove-button" data-product-id="${productId}">
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
      `;
        const minus = newDiv.querySelector('.minus');
        const plus = newDiv.querySelector('.plus');

        minus.addEventListener('click', function () {
            changequantity(productId, -1);
        });

        plus.addEventListener('click', function () {
            changequantity(productId, 1);
        });

        function changequantity(productId, quantityChange) {
            const product = cart[productId];

            if (product) {
                if (quantityChange > 0 && product.cardquantity >= productDetails.quantity) {
                    console.log("Cannot add more.");
                } else {
                    product.cardquantity += quantityChange;

                    if (product.cardquantity <= 0) {
                        delete cart[productId];
                        listCard.innerHTML = " ";
                    }

                    saveCartToLocalStorage();
                    reloadCard();
                }
            }
        }

        listCard.appendChild(newDiv);
    }

    total.innerText = totalprice.toLocaleString();
    cardquantity.innerText = count;

    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            removeProductFromCart(productId);
        });
    });
}

function removeProductFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        saveCartToLocalStorage();
        reloadCard();
    }
}

function changequantity(productId, quantityChange) {
    const product = cart[productId];

    if (product) {
        if (quantityChange > 0 && product.cardquantity >= productDetails.quantity) {
            console.log("Cannot add more.");
        } else {
            product.cardquantity += quantityChange;

            if (product.cardquantity <= 0) {
                delete cart[productId];
                listCard.innerHTML = " ";
            }

            saveCartToLocalStorage();
            reloadCard();
        }
    }
}
// array of products
const arrProducts = [];
for (let i = 0; i < products.length; i++) {
    arrProducts.push(products[i].getProduct());
}
// Function to create a product card
function createProductCard(product) {
    // Create card
    const card = document.createElement("div");
    card.classList.add("card", "col-8", "ms-2", "col-md")
    // Create img to hold product image
    const cardImg = document.createElement("img");
    cardImg.src = product.image;
    cardImg.alt = product.name;
    cardImg.classList.add("card-img-top", "d-block", "w-100");
    cardImg.style.height = "250px";
    // Create card body with product name
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center", "text-black");
    cardBody.innerHTML = `<h5>${product.name}</h5>`;
    // card footer with product price
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "text-center");
    cardFooter.innerHTML = `<p style="color:#eba900;" class="fw-bold">${product.price} E£</p>`;
    // create anchor to go to the product detail page
    const anchor = document.createElement("a");
    anchor.classList.add("card-link")
    anchor.setAttribute("href", "productdetail.html");

    anchor.addEventListener('click', function () {
        localStorage.setItem('selectedProductId', product.id);
        localStorage.setItem(product.id, JSON.stringify(product));
    });// end of anchor click

    anchor.appendChild(cardImg);
    anchor.appendChild(cardBody);
    anchor.appendChild(cardFooter);
    anchor.style.textDecoration = "none";
    anchor.style.backgroundColor = "red";
    // create add to cart icon
    const icon = document.createElement("a");
    icon.classList.add("mt-4", "fs-5", "fa-solid", "fa-cart-plus");

    icon.style.width = "min-content";
    icon.style.height = "50px";
    icon.style.color = "#eba900";
    icon.style.backgroundColor = "blue";

    // anchor.setAttribute("href", "productdetail.html")

    icon.setAttribute("data-bs-toggle", "tooltip")
    icon.setAttribute("data-bs-placement", "right")
    icon.setAttribute("data-bs-title", "Add to Cart")

    icon.addEventListener("click", addToCartIcon(product));

    card.appendChild(icon)
    card.appendChild(anchor);
    return card;
}

// Function to initialize the new Collection Carousel with product cards
function initCarousel(targetdiv, start, end, step) {
    // loop by three to avoid repeating the same product
    for (let i = start; i + step <= end; i += step) {
        const productSlice = arrProducts.slice(i, i + step);// get array of three products

        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        const row = document.createElement("div");// row to hold the three cards
        row.classList.add("row");
        // left of cards empty div just to center the products in the middle
        const leftDiv = document.createElement("div");
        leftDiv.classList.add("col-2", "col-md-1");
        row.appendChild(leftDiv);

        productSlice.forEach(product => {
            const productCard = createProductCard(product);
            row.appendChild(productCard);
        });
        // right of cards empty div just to center the products in the middle
        const rightDiv = document.createElement("div");
        rightDiv.classList.add("col-2", "col-md-1");
        row.appendChild(rightDiv);

        carouselItem.appendChild(row);
        targetdiv.appendChild(carouselItem);
    }

    // Set the first item as active
    targetdiv.children[0].classList.add("active");
}

const newCollectionCarousel = document.querySelector("#NewCollectionProducts .carousel-inner");
const newCollectionCarouselSmall = document.querySelector("#NewCollectionProductsSmall .carousel-inner");
const mostSellingCarousel = document.querySelector("#MostSellingProducts .carousel-inner");
const mostSellingCarouselSmall = document.querySelector("#MostSellingProductsSmall .carousel-inner");

initCarousel(newCollectionCarousel, 0, 8, 4);
initCarousel(newCollectionCarouselSmall, 0, 8, 1);
initCarousel(mostSellingCarousel, 9, 20, 4);
initCarousel(mostSellingCarouselSmall, 9, 20, 1);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))