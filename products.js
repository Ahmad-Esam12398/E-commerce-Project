//products.js
import { Product } from './productsmodule.js';
import { products } from './main.js'



const container = document.querySelector('.container');
const listProduct = document.querySelector('.listProduct');

products.forEach(products => {
  const product = new Product(
    products.id,
    products.name,
    products.price,
    products.quantity,
    products.description,
    products.image,
    products.sellerID,
    products.category,
    products.categorypath
  );


  const productDetails = product.getProduct();
  const productJSON = JSON.stringify(productDetails);

  const productDiv = document.createElement('div');
  productDiv.classList.add('product-details');


  productDiv.addEventListener('click', function () {
    const productId = productDetails.id;
    localStorage.setItem('selectedProductId', productId);
    localStorage.setItem(productId, JSON.stringify(productDetails));


    // console.log(productId);
  });


  productDiv.innerHTML = `
      <div class="hover-icon"><i class="fa-solid fa-basket-shopping"></i></div>
      <a href="productdetail.html?" style="text-decoration: none;">
          <img src="${productDetails.image}" />
          <p>${productDetails.category}</p>
          <h2>${productDetails.name}</h2>
          <p>Price: $${productDetails.price}</p>
      </a>
  `;

  listProduct.appendChild(productDiv)






  listProduct.appendChild(productDiv);
  productDiv.addEventListener('mouseenter', () => {
    const hoverIcon = productDiv.querySelector('.hover-icon');
    if (hoverIcon) {
      hoverIcon.style.display = 'block';
      hoverIcon.style.marginLeft = '250px';
      hoverIcon.style.marginTop = '10px';
      hoverIcon.style.backgroundColor = 'white';
      hoverIcon.style.boxShadow = '0 0 10px rgba(113, 112, 112, 0.5)';
      hoverIcon.style.width = '30px';
      hoverIcon.style.borderRadius = '50%';
      hoverIcon.style.marginLeft = "19vw";
      hoverIcon.style.cursor = "pointer";

    }
  });
  productDiv.addEventListener('mouseleave', () => {
    const hoverIcon = productDiv.querySelector('.hover-icon');
    hoverIcon.style.display = 'none';
  });



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

