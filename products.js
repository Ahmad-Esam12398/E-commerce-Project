import { Product } from './productsmodule.js';
import { products } from './main.js';

const listProduct = document.querySelector('.listProduct');

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
  const productJSON = JSON.stringify(productDetails);

  const productDiv = document.createElement('div');
  productDiv.classList.add('product-details');

  productDiv.addEventListener('click', function () {
    const productId = productDetails.id;
    localStorage.setItem('selectedProductId', productId);
    localStorage.setItem(productId, JSON.stringify(productDetails));
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
      hoverIcon.style.marginLeft = '19vw';
      hoverIcon.style.cursor = 'pointer';
    }
  });

  productDiv.addEventListener('mouseleave', () => {
    const hoverIcon = productDiv.querySelector('.hover-icon');
    hoverIcon.style.display = 'none';
  });
});

