import { Product } from './productsmodule.js';

const productsData = [
  {
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
  ///
  {
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
  /////
  {
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


productsData.forEach(productData => {
  
  const product = new Product(
    productData.name,
    productData.price,
    productData.quantity,
    productData.description,
    productData.image,
    productData.sellerID,
    productData.category
  );

  const productDetails = product.getProduct();


  const productJSON = JSON.stringify(productDetails);


  localStorage.setItem(productDetails.name, productJSON);

 
  const productDiv = document.createElement('div');
  productDiv.classList.add('product-details');
  productDiv.innerHTML = `
    <div class="hover-icon"><i class="fa-solid fa-basket-shopping"></i></div>
    <img src="${productDetails.image}" />
    <p>${productDetails.category}</p>
    <h2>${productDetails.name}</h2>
    <p>Price: $${productDetails.price}</p>
  `;

  
  listProduct.appendChild(productDiv);

 
  productDiv.addEventListener('mouseenter', () => {
    const hoverIcon = productDiv.querySelector('.hover-icon');
    hoverIcon.style.display = 'block';
    hoverIcon.style.marginLeft = '250px';
    hoverIcon.style.marginTop = '10px'; 
    hoverIcon.style.backgroundColor = 'white'; 
    hoverIcon.style.boxShadow = '0 0 10px rgba(113, 112, 112, 0.5)';
    hoverIcon.style.width = '30px'; 
    hoverIcon.style.borderRadius = '50%'; 
    hoverIcon.style.hover.marginLeft="-150px"
});




  productDiv.addEventListener('mouseleave', () => {
    const hoverIcon = productDiv.querySelector('.hover-icon');
    hoverIcon.style.display = 'none';
  });
});