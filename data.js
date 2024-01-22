import { Product } from "./products module.js";
import { Person } from "./person.js";
// debugger;
var products = [
    new Product("Product 1", 100, 10, "Description 1", "1-1.png", 1),
    new Product("Product 2", 200, 20, "Description 2", "1-1.png", 1),
    new Product("Product 3", 300, 30, "Description 3", "1-1.png", 1),
    new Product("Product 4", 400, 40, "Description 4", "1-1.png", 2),
    new Product("Product 5", 500, 50, "Description 5", "1-1.png", 2),
]
var persons = [
    new Person("Person 1", "Email 1", "Password 1", "Address 1", "Phone 1", "Admin"),
    new Person("Person 2", "Email 2", "Password 2", "Address 2", "Phone 2", "Customer"),
    new Person("Person 3", "Email 3", "Password 3", "Address 3", "Phone 3", "Seller"),
    new Person("Person 4", "Email 4", "Password 4", "Address 4", "Phone 4", "Guest"),
    new Person("Person 5", "Email 5", "Password 5", "Address 5", "Phone 5", "Admin"),
    new Person("Person 6", "Email 6", "Password 6", "Address 6", "Phone 6", "customer"),
];
function createTableProducts(){
    let myTable = document.getElementById("myTable");
    let tableHead = document.getElementsByTagName("thead")[0];
    let tableBody = document.getElementsByTagName("tbody")[0];
    let tableRow = document.createElement("tr");
    for(let key in products[0].getProduct()){
        let tableHeadData = document.createElement("th");
        tableHeadData.innerHTML = key;
        tableRow.appendChild(tableHeadData);
    }
    tableHead.appendChild(tableRow);
    myTable.appendChild(tableHead);
    for(let i = 0; i < products.length; i++){
        tableRow = document.createElement("tr");
        for(let key in products[i].getProduct()){
            if(key == "image"){
                let img = document.createElement("img");
                img.src = products[i].image;
                img.alt = "Main Product Img";
                let tableData = document.createElement("td");
                tableData.appendChild(img);
                tableRow.appendChild(tableData);
            }
            else{
                let tableData = document.createElement("td");
                tableData.innerHTML = products[i].getProduct()[key];
                tableRow.appendChild(tableData);
            }
        }
        tableBody.appendChild(tableRow);
        myTable.appendChild(tableBody);
    }
    myTable.appendChild(tableHead);
}
createTableProducts();
function addProductRow(){
    let myTableBody = document.querySelectorAll('tbody')[0];
    let newRow = document.createElement("tr");
    for(let key in products[0].getProduct()){
        let td = document.createElement('td');
        newRow.appendChild(td);
    }
    myTableBody.appendChild(newRow);
}
addProductRow();
export { products, persons };


