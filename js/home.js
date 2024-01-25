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
    card.classList.add("d-none", "d-md-block", "col-md")
    // Create img to hold product image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.classList.add("d-block", "w-100", "sectionimg");
    img.style.height = "400px";
    // Create div to hold product caption(name and price)
    const caption = document.createElement("div");
    caption.classList.add("card-footer", "text-center", "pt-2", "text-black");
    caption.style.backgroundColor = "#edb932";
    caption.innerHTML = `<h5>${product.name}</h5><p class="fw-bold">${product.price} E£</p>`;
    caption.style.height = "90px";

    // create anchor to go to the product detail page
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "products.hmtl");

    anchor.appendChild(img);
    anchor.appendChild(caption);
    anchor.style.textDecoration = "none";
    card.appendChild(anchor);

    return card;
}

// Function to initialize the new Collection Carousel with product cards
function initCarousel(targetdiv, start, end) {
    // loop by three to avoid repeating the same product
    for (let i = start; i + 4 <= end; i += 4) {
        const productSlice = arrProducts.slice(i, i + 4);// get array of three products

        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        const row = document.createElement("div");// row to hold the three cards
        row.classList.add("row");
        // left of cards empty div just to center the products in the middle
        const leftDiv = document.createElement("div");
        leftDiv.classList.add("col-md-1");
        row.appendChild(leftDiv);

        productSlice.forEach(product => {
            const productCard = createProductCard(product);
            row.appendChild(productCard);
        });
        // right of cards empty div just to center the products in the middle
        const rightDiv = document.createElement("div");
        rightDiv.classList.add("col-md-1");
        row.appendChild(rightDiv);

        carouselItem.appendChild(row);
        targetdiv.appendChild(carouselItem);
    }

    // Set the first item as active
    targetdiv.children[0].classList.add("active");
}

const newCollectionCarousel = document.querySelector("#NewCollectionProducts .carousel-inner");
const mostSellingCarousel = document.querySelector("#MostSellingProducts .carousel-inner");

initCarousel(newCollectionCarousel, 0, 8);
initCarousel(mostSellingCarousel, 9, 20);