
import { Product } from './productsmodule.js';
import { products } from './data.js';

/////////////////////////checkProductQuantity function///////////////////////////
 function checkProductQuantity(productId) {
  const product = products.find(product => product.id == productId);
  return product && product.quantity > 0;
}

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
  console.error("can't get 'cart' from localStorage:", error);
}

function getAllProducts() {
  let productsArr = [];

  for (const productId in cart) {
    const productDetails = products.find(product => product.id == productId);

    if (productDetails) {
      productDetails.quantity = cart[productId].quantity;
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Parse the localStorage item back to an array
  let localStorageProducts = JSON.parse(localStorage.getItem('products'));

  if (!localStorageProducts || localStorageProducts.length === 0) {
    // If not found or empty, use products from data.js
    for (let i = 0; i < products.length; i++) {
      productsArr.push(products[i].getProduct());
    }
    localStorageProducts = productsArr;
    localStorage.setItem("products", JSON.stringify(productsArr));
  }

  return localStorageProducts;
}

function displayProducts() {
  const allProducts = getAllProducts();

  allProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-details');
    productDiv.id = product.id;
    const hoverIcon = document.createElement('div');
    hoverIcon.classList.add('hover-icon');
    hoverIcon.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>`;
    hoverIcon.addEventListener('click', () => addToCart(product.id, product.quantity));

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




    if (cart[product.id]) {
      product.quantity = cart[product.id].quantity;
    }

    productDiv.appendChild(productDetailsContainer);
    listProduct.appendChild(productDiv);

    if (!checkProductQuantity(product.id)) {
  
    }
  });
}
function addToCart(productId) {
  const productDetails = getAllProducts().find(product => product.id == productId);

  if (!productDetails) {
    console.error("Product details not found for productId:", productId);
    return;
  }

  let stockElement = document.createElement('p');

  if (!cart[productId]) {
    cart[productId] = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.image,
      cardquantity: 1,
      quantity: productDetails.quantity
    };
  } else if (cart[productId].cardquantity >= productDetails.quantity) {
    console.log("Can't add more.");
    stockElement.textContent = 'Out of Stock';
    stockElement.style.marginTop = "-350px"
    stockElement.style.marginLeft = "10px";
    stockElement.style.border = "1px solid black";
    stockElement.style.borderRadius = "10px";
    stockElement.style.color = "yellow";
    stockElement.style.width = "100px";
    stockElement.style.textAlign = "center";
    stockElement.style.padding = "5px";
    stockElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";

    // Append the stockElement to the product details container
    const productDiv = document.getElementById(productId);
    productDiv.appendChild(stockElement);

   

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

  // Retrieve cart data from local storage on reload
  if (localStorage.getItem('cart') !== null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  const allProducts = getAllProducts();

  for (const productId in cart) {
    const productDetails = allProducts.find(product => product.id == productId);

    if (!productDetails) {
      console.error("Product details not found for productId:", productId);
      continue;
    }

    totalprice += productDetails.price * cart[productId].cardquantity;
    count += cart[productId].cardquantity;



    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <div>
        <img src="${productDetails.image || 'path/to/default/image.jpg'}" alt="Product Image" />
      </div>
      <h2>${productDetails.name}</h2>
      <div class="plusevent">
        <span class="minus">-</span>
        <span class="num">${cart[productId].cardquantity}</span>
        <span class="plus">+</span>
      </div>
      <p>$${productDetails.price * cart[productId].cardquantity.ti}</p>
      <button class="remove-button" data-product-id="${productId}">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    `;
    const minus = newDiv.querySelector('.minus');
    const plus = newDiv.querySelector('.plus');


    minus.addEventListener('click', () => changequantity(productId, -1));
    plus.addEventListener('click', () => changequantity(productId, 1));

    if (count === 0) {
 
      products.forEach(product => product.quantity = 0);
      localStorage.setItem('products', JSON.stringify(products));
    }
    

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

//////////////change quantity of product ///////////
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
////////remove productfromcart ////////
function removeProductFromCart(productId) {
  if (cart[productId]) {
    delete cart[productId];
    saveCartToLocalStorage();
    reloadCard();
  }
}
//////////save cart to locatstorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Display products when the page and card loads
displayProducts();
reloadCard();


// ------------------checkout -----------
const checkoutButton = document.querySelector('.checkbtn');
checkoutButton.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    console.log("cart is empty");
    return;
  }

  saveCartToLocalStorage();
  window.location.href = 'checkout.html';
});

/////////////// function for search ////////////
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

//////////// function for filter catogary ///////////////////////////
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


window.addEventListener("load", function () {
  let productsDIV = document.getElementsByClassName("product-details");
  for (let i = 0; i < productsDIV.length; i++) {
    productsDIV[i].addEventListener("click", function (e) {
      if (this.nodeName != "I") {
        localStorage.setItem("selectedProductId", this.id);
        let productsArr = getAllProducts();
        for (let i = 0; i < productsArr.length; i++) {
          if (productsArr[i]["id"] == this.id) {
            localStorage.setItem(this.id, JSON.stringify(productsArr[i]));
            // alert("Hello");
            break;
          }
        }
      }
    });
  }
});



