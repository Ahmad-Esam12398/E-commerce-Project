import { Product } from './productsmodule.js';

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
  console.error("Can't get 'cart' from localStorage:", error);
}

function getAllProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function displayProducts() {
  const allProducts = getAllProducts();

  allProducts.forEach(productData => {
    const product = new Product(
      productData.name,
      productData.price,
      productData.quantity,
      productData.description,
      productData.image,
      productData.sellerID,
      productData.category,
      productData.categorypath
    );

    const productDiv = document.createElement('div');
    productDiv.classList.add('product-details');

    const hoverIcon = document.createElement('div');
    hoverIcon.classList.add('hover-icon');
    hoverIcon.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>`;
    hoverIcon.addEventListener('click', () => addToCart(product.id));

    productDiv.appendChild(hoverIcon);

    const productDetailsContainer = document.createElement('div');
    productDetailsContainer.innerHTML = `
      <a href="productdetail.html?" style="text-decoration: none;">
        <img src="${product.image || 'path/to/default/image.jpg'}" alt="Product Image" />
        <p>${product.category}</p>
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
      </a>
    `;

    const stockElement = document.createElement('p');
    stockElement.textContent = product.quantity > 0 ? '' : 'Out of Stock';
    productDetailsContainer.appendChild(stockElement);

    productDetailsContainer.insertBefore(stockElement, productDetailsContainer.firstChild);

    productDiv.appendChild(productDetailsContainer);
    listProduct.appendChild(productDiv);
  });
}

function addToCart(productId) {
  const productDetails = allLocalStorageData[productId];
  if (!cart[productId]) {
    cart[productId] = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.image,
      cardquantity: 1
    };
  } else if (cart[productId].cardquantity >= productDetails.quantity) {
    console.log("Can't add more.");
    
  } else {
    cart[productId].cardquantity++;
  }
  saveCartToLocalStorage();
  reloadCard();
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
        <img src="${productDetails.image || 'path/to/default/image.jpg'}" alt="Product Image" />
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

    minus.addEventListener('click', () => changequantity(productId, -1));
    plus.addEventListener('click', () => changequantity(productId, 1));

    listCard.appendChild(newDiv);
  }

  total.innerText = totalprice.toLocaleString();
  cardquantity.innerText = count;

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      removeProductFromCart(productId);
    });
  });
}

function changequantity(productId, quantityChange) {
  const productDetails = cart[productId];

  if (productDetails) {
    if (quantityChange > 0 && productDetails.cardquantity >= productDetails.quantity) {
      console.log("Cannot add more.");
    } else {
      productDetails.cardquantity += quantityChange;

      if (productDetails.cardquantity <= 0) {
        delete cart[productId];
      }

      saveCartToLocalStorage();
      reloadCard();
    }
  }
}

function removeProductFromCart(productId) {
  if (cart[productId]) {
    delete cart[productId];
    saveCartToLocalStorage();
    reloadCard();
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Display products when the page loads
displayProducts();

const checkoutButton = document.querySelector('.checkbtn');
checkoutButton.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    console.log("cart is empty");
    return;
  }

  saveCartToLocalStorage();
  window.location.href = 'checkout.html';
});

var offcanvas = new bootstrap.Offcanvas(document.getElementById('demo'));

window.search = function () {
  var searchtext = document.getElementsByTagName('input')[0].value.toLowerCase();
  var productDivs = document.querySelectorAll('.product-details');
  var found = false;

  productDivs.forEach(productDiv => {
    var categoryName = productDiv.querySelector('h2').innerText.toLowerCase();
    if (categoryName.includes(searchtext)) {
      productDiv.style.display = "block";
      found = true;
    } else {
      productDiv.style.display = "none";
    }
  });

  if (!found) {
    productDivs.forEach(productDiv => {
      productDiv.style.display = "block";
    });
  }
};

window.display = function (e) {
  var target = e.target;
  if (target.tagName === 'P' && target.id === 'poption') {
    var categoryName = target.innerText.toLowerCase();
    var productDivs = document.querySelectorAll('.product-details');
    var found = false;

    productDivs.forEach(productDiv => {
      var productCategory = productDiv.querySelector('p').innerText.toLowerCase();
      if (productCategory.includes(categoryName)) {
        productDiv.style.display = "block";
        found = true;
      } else {
        productDiv.style.display = "none";
      }
    });

    if (!found) {
      productDivs.forEach(productDiv => {
        productDiv.style.display = "block";
      });
    }
  }
};
