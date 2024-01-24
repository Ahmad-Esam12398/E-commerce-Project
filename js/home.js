// Sample array of product objects
const arrProducts = [
    { name: "Product 1", price: "$19.99", image: "images/2.jpg" },
    { name: "Product 2", price: "$29.99", image: "images/5.jpg" },
    { name: "Product 3", price: "$39.99", image: "images/2.jpg" },
    { name: "Product 4", price: "$49.99", image: "images/5.jpg" },
    { name: "Product 5", price: "$59.99", image: "images/2.jpg" },
];

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("d-none", "d-md-block", "col-md-4")
    
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.classList.add("d-block", "w-100", "sectionimg");
    img.style.height = "350px";
    
    const caption = document.createElement("div");
    caption.classList.add("card-footer", "text-center", "pt-2", "text-black");
    caption.style.backgroundColor = "#edb932";
    caption.innerHTML = `<h5>${product.name}</h5><p>${product.price}</p>`;
    
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "products.hmtl");
    
    anchor.appendChild(img);
    anchor.appendChild(caption);
    anchor.style.textDecoration = "none";
    card.appendChild(anchor);

    return card;
}

// Function to initialize the new Collection Carousel with product cards
function initNewCollCarousel() {
    const newCollectionCarousel = document.querySelector("#NewCollectionProducts .carousel-inner");

    for (let i = 0; i < arrProducts.length; i += 3) {
        const productSlice = arrProducts.slice(i, i + 3);

        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item", "mx-3");

        const row = document.createElement("div");
        row.classList.add("row");

        productSlice.forEach(product => {
            const productCard = createProductCard(product);
            row.appendChild(productCard);
        });

        carouselItem.appendChild(row);
        newCollectionCarousel.appendChild(carouselItem);
    }

    // Set the first item as active
    newCollectionCarousel.children[0].classList.add("active");
}

// Function to initialize the most selling Carousel with product cards
function initMostSellCarousel() {
    const mostSellingCarousel = document.querySelector("#MostSellingProducts .carousel-inner");

    for (let i = 0; i < arrProducts.length; i += 3) {
        const productSlice = arrProducts.slice(i, i + 3);

        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item", "ms-3");

        const row = document.createElement("div");
        row.classList.add("row");

        productSlice.forEach(product => {
            const productCard = createProductCard(product);
            row.appendChild(productCard);
        });

        carouselItem.appendChild(row);
        mostSellingCarousel.appendChild(carouselItem);
    }

    // Set the first item as active
    mostSellingCarousel.children[0].classList.add("active");
}

initNewCollCarousel();
initMostSellCarousel();