
import { Product } from './productsmodule.js';
import { products } from './main.js';


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
  });

  productDiv.addEventListener('mouseleave', () => {
    hoverIcon.style.display = 'none';
  });


  function addToCartIcon() {
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

hoverIcon.addEventListener('click',addToCartIcon);




});

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


function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

reloadCard();

const checkoutButton = document.querySelector('.checkbtn');
checkoutButton.addEventListener('click', function () {

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
}
window.display = function (e) {
  var target = e.target;
  if (target.tagName === 'P' && target.id === 'poption') {
    var categoryName = target.innerText.toLowerCase();
    var productDivs = document.querySelectorAll('.product-details');
    productDivs.forEach(productDiv => {
      var productCategory = productDiv.querySelector('p').innerText.toLowerCase();
      if (productCategory.includes(categoryName)) {
        productDiv.style.display = "block";
      } else {
        productDiv.style.display = "none";
      }
    });
  }
}

export{addToCartIcon,saveCartToLocalStorage,reloadCard}


