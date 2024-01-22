//products.js
import { Product } from './products module.js';

const productsData = [
  {
    id:1,
    name: 'Bathroom Golden Ring Mirror',
    price: 124.25,
    quantity: 15,
    description: "Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.",
    image: 'images/bathroom-circle-mirror.png',
    sellerID: 1,
    category:"Bathroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:2,
    name: 'Bathroom Wooden Table',
    price:550.00,
    quantity: 8,
    description:' Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis.',
    image: 'images/bathroom-wooden-table.png',
    sellerID: 2,
    category:"Bathroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:3,
    name: 'bedroom-single-chair',
    price: 504.00,
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/bedroom-single-chair.png',
    sellerID: 3,
    category:"Bedroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:4,
    name: 'Black Metal Lamp',
    price: 124.25,
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/black-metal-lamp.png',
    sellerID: 3,
    category:"Home Office",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:5,
    name: 'Beige Working Chair With Armrest"',
    price: 265.00,
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/bathroom-circle-mirror.png',
    sellerID: 3,
    category:"Home Office",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:6,
    name: 'Blue Comfy Fabric Chair',
    price: 580.50,
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/black-metal-lamp.png',
    sellerID: 3,
    category:"Bedroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  
  {
    id:7,
    name: 'Brown Circle Stool',
    price: '224.00',
    quantity: 15,
    description: "Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.",
    image: 'images/brown-wooden-stool.png',
    sellerID: 1,
    category:"Kitchen",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:8,
    name: 'Brown Living Room Sofa',
    price:'1.200.00',
    quantity: 8,
    description:' Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis.',
    image: 'images/cream-ceramic-oval-bathtub.png',
    sellerID: 2,
    category:"Bathroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:9,
    name: 'Egyptian Vase',
    price: 400.00,
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/egyptian-brown-vase.png',
    sellerID: 3,
    category:"Home Office",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:10,
    name: 'Green Living Room Sofa',
    price:" 1.200.00",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/living-room-green-sofa-.png',
    sellerID: 3,
    category:"Living Room",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:11,
    name: 'King Size Master Bedroom',
    price: "14.500.50",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/king-size-master-bedroom.png',
    sellerID: 3,
    category:"Bedroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:12,
    name: 'Kitchen Cabinet',
    price: "1.150.25",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/kitchen-furniture-cabinet.png',
    sellerID: 3,
    category:"Cabinet",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  
  {
    id:13,
    name: 'Modern Emerald Fabric Chair',
    price:'860.00',
    quantity: 8,
    description:' Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis.',
    image: 'images/furniture-green-fabric-chair.png',
    sellerID: 2,
    category:"chair",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    name: 'Wall Hanging Cabinet',
    price:"840.00",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/wall-hanging-cabinet-.png',
    sellerID: 3,
    category:'Cabinet',
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:14,
    name: 'White Kitchen Island',
    price:" 4.800.50",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/kitchen-island-set.png',
    sellerID: 3,
    category:"Kitchen",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:15,
    name: 'Wooden Bath Room Stool',
    price: "220.50",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/wooden-stool.png',
    sellerID: 3,
    category:"Bedroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  },
  {
    id:16,
    name: 'Wooden Console Table',
    price: "724.00",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/wooden-console-table-.png',
    sellerID: 3,
    category:"Bathroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  }
  ,{
    id:17,
    name: 'Wooden Console Table',
    price: "724.00",
    quantity: 20,
    description: 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.',
    image: 'images/wooden-console-table-.png',
    sellerID: 3,
    category:"Bathroom",
    categorypath:"Home / Living Room / Chair / Modern Emerald Fabric Chair",
    catograies:" Chair, Living Room",
  }
];


const container = document.querySelector('.container');
const listProduct = document.querySelector('.listProduct');

//esraa
// for(var i=0;i<productsData;i++){
//   document.getElementById("")[i].addEventListener("click",function(){
//     localStorage.setItem('id',`${productDetails.id}`)

//   });
// }
//

productsData.forEach(productData => {
  const product = new Product(
      productData.id,
      productData.name,
      productData.price,
      productData.quantity,
      productData.description,
      productData.image,
      productData.sellerID,
      productData.category,
      productData.categorypath
  );

  const productDetails = product.getProduct();
  const productJSON = JSON.stringify(productDetails);
  // localStorage.setItem(productDetails.id.toString(), productJSON);

  const productDiv = document.createElement('div');
  productDiv.classList.add('product-details');
  // localStorage.setItem('id',`${productDetails.id}`)
  const productDetailsElements = document.querySelectorAll(".product-details");

for (let i = 0; i < productDetailsElements.length; i++) {
    productDetailsElements[i].addEventListener("click", function () {
        const productId = productsData[i].id;
        localStorage.setItem('selectedProductId', productId);
        console.log(productId);
        // Optionally, you can redirect to the product detail page after storing the ID
        // window.location.href = 'productdetail.html?id=' + productId;
    });
}
  

 
  productDiv.innerHTML = `
  <div class="hover-icon"><i class="fa-solid fa-basket-shopping"></i></div>
  <a href="productdetail.html?id=${productDetails.id}" style="text-decoration: none;">
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
        hoverIcon.style.marginLeft = "250px";
        hoverIcon.style.cursor="pointer";
      
    }
});
  productDiv.addEventListener('mouseleave', () => {
    const hoverIcon = productDiv.querySelector('.hover-icon');
    hoverIcon.style.display = 'none';
  });

//   productDiv.addEventListener('click', () => {
//     const productId = productDetails.id;
//     sessionStorage.setItem('selectedProductId', productId);
//     // Redirect to product detail pa
//     window.location.href = 'productdetail.html';
// });
  
});

var offcanvas = new bootstrap.Offcanvas(document.getElementById('demo'));

window.search = function() {
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

