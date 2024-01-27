import { products, persons } from "./data.js";
let noOfProducts = products.length;
let noOfPersons = persons.length;
let noOfGoingOrders = 10;
$("#noOfProducts").text(noOfProducts);
$("#noOfUsers").text(noOfPersons);
$("#noOfOrders").text(noOfGoingOrders);
let noOfAdmins = 0;
let noOfSellers = 0;
let noOfCustomers = 0;
let noOfGuests = 0;
persons.forEach(person => {if(person.role == "Admin") noOfAdmins++;});
persons.forEach(person => {if(person.role == "Seller") noOfSellers++;});
persons.forEach(person => {if(person.role == "Customer") noOfCustomers++;});
persons.forEach(person => {if(person.role == "Guest") noOfGuests++;});

function generateRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    colors.push(`rgb(${red}, ${green}, ${blue})`);
  }
  return colors;
}
// let noOfProductsInEachCategory = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// products.forEach(product => {
//   if(product.category == "Bathroom") noOfProductsInEachCategory[0]++;
//   if(product.category == "Bedroom") noOfProductsInEachCategory[1]++;
//   if(product.category == "Cabinet") noOfProductsInEachCategory[2]++;
//   if(product.category == "Chair") noOfProductsInEachCategory[3]++;
//   if(product.category == "Home Office") noOfProductsInEachCategory[4]++;
//   if(product.category == "Kitchen") noOfProductsInEachCategory[5]++;
//   if(product.category == "Living Room") noOfProductsInEachCategory[6]++;
//   if(product.category == "Sofa") noOfProductsInEachCategory[7]++;
//   if(product.category == "Stool") noOfProductsInEachCategory[8]++;
//   if(product.category == "Table") noOfProductsInEachCategory[9]++;
//   if(product.category == "Wall Hanging") noOfProductsInEachCategory[10]++;
//   if(product.category == "Wooden") noOfProductsInEachCategory[11]++;
//   if(product.category == "Home") noOfProductsInEachCategory[12]++;
//   if(product.category == "Office") noOfProductsInEachCategory[13]++;
// });

let ctx = document.getElementById('myFirstChart').getContext('2d');

let firstChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# Trending Products',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      Responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
const data = {
    labels: [
      'Admins',
      'Sellers',
      'Customers',
      'Guests'
    ],
    datasets: [{
      label: 'Count',
      data: [noOfAdmins, noOfSellers, noOfCustomers, noOfGuests],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],
      hoverOffset: 4
    }]
  };
  ctx = document.getElementById('mySecondChart').getContext('2d');
  let secondChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      Responsive: true,
    }
  });