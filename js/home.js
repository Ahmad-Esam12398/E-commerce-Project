
import { products } from "../data.js";
// array of products
const arrProducts = [];
for (let i = 0; i < products.length; i++) {
    arrProducts.push(products[i].getProduct());
}
// Function to create a product card
function createProductCard(product) {
    // Create card
    const card = document.createElement("div");
    card.classList.add("card" ,"col-8","ms-2" ,"col-md")
    // Create img to hold product image
    const cardImg = document.createElement("img");
    cardImg.src = product.image;
    cardImg.alt = product.name;
    cardImg.classList.add("card-img-top","d-block", "w-100");
    cardImg.style.height = "250px";
    // Create card body with product name
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center","text-black");
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
    // create add to cart icon
    const icon = document.createElement("a");
    icon.classList.add("mt-4","fs-5","fa-solid","fa-cart-plus");
    
    icon.style.width="min-content";
    icon.style.color="#eba900";
    
    icon.setAttribute("href","productdetail.html")
    
    icon.setAttribute("data-bs-toggle","tooltip")
    icon.setAttribute("data-bs-placement","right")
    icon.setAttribute("data-bs-title","Add to Cart")
    
    card.appendChild(icon)
    card.appendChild(anchor);
    return card;
}

// Function to initialize the new Collection Carousel with product cards
function initCarousel(targetdiv, start, end,step) {
    // loop by three to avoid repeating the same product
    for (let i = start; i + step <= end; i += step) {
        const productSlice = arrProducts.slice(i, i + step);// get array of three products

        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        const row = document.createElement("div");// row to hold the three cards
        row.classList.add("row");
        // left of cards empty div just to center the products in the middle
        const leftDiv = document.createElement("div");
        leftDiv.classList.add("col-2","col-md-1");
        row.appendChild(leftDiv);

        productSlice.forEach(product => {
            const productCard = createProductCard(product);
            row.appendChild(productCard);
        });
        // right of cards empty div just to center the products in the middle
        const rightDiv = document.createElement("div");
        rightDiv.classList.add("col-2","col-md-1");
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

initCarousel(newCollectionCarousel, 0, 8,4);
initCarousel(newCollectionCarouselSmall,0, 8,1);
initCarousel(mostSellingCarousel, 9, 20,4);
initCarousel(mostSellingCarouselSmall, 9, 20,1);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))