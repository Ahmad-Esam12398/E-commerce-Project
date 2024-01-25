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
const category = ['Bathroom', 'Bedroom', 'Home Office', 'Kitchen', 'Living Room', 'Cabinet'];
let noOfProductsInEachCategory = [0,0,0,0,0,0];
products.forEach(product => {
	if(product.category == category[0]) noOfProductsInEachCategory[0]++;
	if(product.category == category[1]) noOfProductsInEachCategory[1]++;
	if(product.category == category[2]) noOfProductsInEachCategory[2]++;
	if(product.category == category[3]) noOfProductsInEachCategory[3]++;
	if(product.category == category[4]) noOfProductsInEachCategory[4]++;
	if(product.category == category[5]) noOfProductsInEachCategory[5]++;
});
console.log(noOfProductsInEachCategory);
let ctx = document.getElementById('myFirstChart').getContext('2d');

let firstChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: category,
        datasets: [{
            label: '# Product in Each Category',
            data: noOfProductsInEachCategory,
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