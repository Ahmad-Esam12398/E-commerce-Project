
import { Product } from './productsmodule.js';
import { products } from './data.js';


const listProduct = document.querySelector('.listProduct');
const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const cardquantity = document.querySelector('.cardquantity'); 

let cart = {};

try {
  const cartString = localStorage.getItem('cart');

  if (cartString !== null && cartString !== undefined) {
    cart = JSON.parse(cartString);
  }
} catch (error) {
  console.error("can't get  'cart' from localStorage:", error);
}




export function addToCartIcon() {
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

products.forEach(productInfo => {
  const product = new Product(
    productInfo.name,
    productInfo.price,
    productInfo.quantity,
    productInfo.description,
    productInfo.image,
    productInfo.sellerID,
    productInfo.category,
    productInfo.categorypath
  );

  const productDetails = product.getProduct();

  const productDiv = document.createElement('div');
  productDiv.classList.add('product-details');

  productDiv.addEventListener('click', function () {
    const productId = productDetails.id;
    localStorage.setItem('selectedProductId', productId);
    localStorage.setItem(productId, JSON.stringify(productDetails));
  });

  const hoverIcon = document.createElement('div');
  hoverIcon.classList.add('hover-icon');
  hoverIcon.setAttribute('data-product-id', productDetails.id);

  hoverIcon.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>`;

  productDiv.appendChild(hoverIcon);

  const productDetailsContainer = document.createElement('div');
  productDetailsContainer.innerHTML = ``
  const hoverIcon = document.createElement('div');
  hoverIcon.classList.add('hover-icon');
  hoverIcon.setAttribute('data-product-id', productDetails.id);

  hoverIcon.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>`;

  productDiv.appendChild(hoverIcon);

  const productDetailsContainer = document.createElement('div');
  productDetailsContainer.innerHTML = `
    <a href="productdetail.html?" style="text-decoration: none;">
      <img src="${productDetails.image}" />
      <p>${productDetails.category}</p>
      <h2>${productDetails.name}</h2>
      <p>Price: $${productDetails.price}</p>
    </a>
  `;
  productDiv.appendChild(productDetailsContainer);

  listProduct.appendChild(productDiv);

  hoverIcon.style.display = 'none';

  hoverIcon.style.display = 'none';

  productDiv.addEventListener('mouseenter', () => {
    hoverIcon.style.display = 'block';
    hoverIcon.style.marginLeft = '250px';
    hoverIcon.style.marginTop = '10px';
    hoverIcon.style.backgroundColor = 'white';
    hoverIcon.style.boxShadow = '0 0 10px rgba(113, 112, 112, 0.5)';
    hoverIcon.style.width = '30px';
    hoverIcon.style.borderRadius = '50%';
    hoverIcon.style.marginLeft = '19vw';
    hoverIcon.style.cursor = 'pointer';
    hoverIcon.style.display = 'block';
    hoverIcon.style.marginLeft = '250px';
    hoverIcon.style.marginTop = '10px';
    hoverIcon.style.backgroundColor = 'white';
    hoverIcon.style.boxShadow = '0 0 10px rgba(113, 112, 112, 0.5)';
    hoverIcon.style.width = '30px';
    hoverIcon.style.borderRadius = '50%';
    hoverIcon.style.marginLeft = '19vw';
    hoverIcon.style.cursor = 'pointer';
  });

  productDiv.addEventListener('mouseleave', () => {
    hoverIcon.style.display = 'none';
  });
});

