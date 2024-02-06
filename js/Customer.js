import { persons as plainPersons } from "./data.js";
import { originalOrders as initialOrders, originalOrders } from "./data.js";

let activeUser = JSON.parse(localStorage.getItem("Active User"));
if (activeUser.role == null || activeUser.role == "Guest") {
    location = "home.html";
}

if (localStorage.getItem("Persons") == null) {
    let plainPersons = originalPersons.map((item) => item.getPerson());
    localStorage.setItem("Persons", JSON.stringify(plainPersons));
    // console.log(JSON.parse(localStorage.getItem("Persons")));
}
let persons = JSON.parse(localStorage.getItem("Persons"));

// function to check E-mail
function checkEmail(mail) {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].email == mail) { return true; }
    }
    return false;
}
// function to check E-mail
function checkPhone(phone) {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].phone == phone) { return true; }
    }
    return false;
}


// add to cart functions from Bothina
const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const cardquantity = document.querySelector('.cardquantity');

let cart = {};
if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function changequantity(productId, quantityChange) {
    const product = cart[productId];

    if (product) {
        if (quantityChange > 0 && product.cardquantity >= product.quantity) {
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
        const minuss = newDiv.querySelector('.minus');
        const pluss = newDiv.querySelector('.plus');

        minuss.addEventListener('click', function () {
            changequantity(productId, -1);
        });

        pluss.addEventListener('click', function () {
            changequantity(productId, 1);
        });

        listCard.appendChild(newDiv);
    }

    total.innerText = `$${totalprice.toLocaleString()}`;
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

reloadCard();
// Set User Data
let custname = document.getElementById("customerName");
let custemail = document.getElementById("customerEmail");
let custaddress = document.getElementById("customerAddress");
let custphone = document.getElementById("customerPhone");
let custrole = document.getElementById("customerRole");

let namep = document.createElement("p");
let emailp = document.createElement("p");
let addressp = document.createElement("p");
let phonep = document.createElement("p");
let rolep = document.createElement("p");

namep.innerText += activeUser.name;
emailp.innerText += activeUser.email;
addressp.innerText += activeUser.address;
phonep.innerText += activeUser.phone;
rolep.innerText += activeUser.role;

namep.style.color = "white";
emailp.style.color = "white";
addressp.style.color = "white";
phonep.style.color = "white";
rolep.style.color = "white";

custname.appendChild(namep)
custemail.appendChild(emailp)
custaddress.appendChild(addressp)
custphone.appendChild(phonep)
custrole.appendChild(rolep)

// print order table
if (localStorage.getItem("originalOrders") == null) {
    localStorage.setItem("originalOrders", JSON.stringify(initialOrders));
}
let orders = JSON.parse(localStorage.getItem("originalOrders"));
let usersOrders = [];
for (let i = 0; i < orders.length; i++) {
    if (orders[i].customerId == activeUser.id) {
        usersOrders.push(orders[i]);
    }
}

let products = JSON.parse(localStorage.getItem("products"));

function breakOrdersIntoProducts(ordersRow) {
    let target = [];
    let productsId = ordersRow["products"];
    let productsIndices = [];

    for (let i = 0; i < productsId.length; i++) {
        productsIndices.push(products.findIndex(product => product.id == productsId[i]));
    }

    for (let i = 0; i < ordersRow["products"].length; i++) {
        let result = { id: ordersRow["id"], product: products[productsIndices[i]], quantity: ordersRow["quantities"][i], date: ordersRow["date"], status: ordersRow["status"] }
        target.push(result);
    }
    return target;
}
function createTableOrders() {
    let myTable = document.getElementById("myTable");
    let tableHeader = document.getElementsByTagName("thead")[0];
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableHeader.innerHTML = `<th>ID</th> <th>Product</th> <th>Quantity</th>  <th>Unit Price</th> <th>Subtotal</th><th>Total</th> <th>Date</th> <th>Status</th>`
    tableBody.innerHTML = "";

    for (let i = 0; i < usersOrders.length; i++) {
        let tableBody = document.getElementsByTagName("tbody")[0];
        let result = breakOrdersIntoProducts(usersOrders[i]);

        for (let j = 0; j < result.length; j++) {
            let tableRow = document.createElement("tr");
            let id = result[j]["id"];
            let productName = result[j]["product"].name;
            let quantity = result[j]["quantity"];
            let date = result[j]["date"];
            let status = result[j]["status"];
            // let customerId = orders[i]["customerId"];
            let unitPrice = result[j]["product"].price;
            let tableData = document.createElement("td");
            if (j == 0) {
                tableData.innerHTML = id;
                tableData.setAttribute("rowspan", result.length);
                tableRow.appendChild(tableData);
            }
            tableData = document.createElement("td");
            tableData.innerHTML = productName;
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            tableData.innerHTML = quantity;
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            tableData.innerHTML = unitPrice + " $";
            tableRow.appendChild(tableData);
            let totalPrice = unitPrice * quantity;
            tableData = document.createElement("td");
            tableData.innerHTML = totalPrice + " $";
            tableRow.appendChild(tableData);
            if (j == 0) {
                let sum = 0;
                for (let k = 0; k < result.length; k++) {
                    sum += result[k]["product"].price * result[k]["quantity"];
                }
                tableData = document.createElement("td");
                tableData.setAttribute("rowspan", result.length);
                tableData.innerHTML = sum + " $";
                tableData.classList.add("fs-5", "fw-bold", "text-success");
                tableRow.appendChild(tableData);

                tableData = document.createElement("td");
                tableData.innerHTML = date;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("fw-bold");
                tableRow.appendChild(tableData);
                tableData = document.createElement("td");
                tableData = document.createElement("td");
                tableData.innerHTML = status;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("fw-bold");
                tableData.classList.add("text-uppercase");
                if (status == "delivered") {
                    tableData.classList.add("text-white");
                    tableData.classList.add("bg-success");
                    tableRow.appendChild(tableData);
                }
                else if (status == "shipped") {
                    tableData.classList.add("bg-warning");
                    tableRow.appendChild(tableData);
                }
                else {
                    tableData.classList.add("text-white");
                    tableData.classList.add("bg-danger");
                    tableRow.appendChild(tableData);
                }
                tableRow.appendChild(tableData);
            }
            tableBody.appendChild(tableRow);
        }
        myTable.appendChild(tableBody);
    }
};
if (usersOrders.length > 0) { createTableOrders(); }

function updatePersonsLocalStorage() {
    localStorage.setItem("Persons", JSON.stringify(persons));
}

//Show password
document.getElementById("ShowPassword").addEventListener("click", function () {
    var x = document.getElementById("floatingPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

// edit profile
let operation;
function editRow(e) {
    document.forms[0].classList.remove("was-validated");
    let UserData = [activeUser.id, activeUser.name, activeUser.email, activeUser.password, activeUser.address, activeUser.phone, activeUser.role];
    //want to replace the row with a form modal like one in add product
    let inputs = document.querySelectorAll(".inputs");
    // console.log(inputs);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = UserData[i + 1];
    }
    let saveButton = document.querySelectorAll("button[type='submit']")[0];
    saveButton.innerHTML = "Save";
    operation = "edit";
}

function setPerson(index, values) {
    persons[index].name = values[0];
    persons[index].email = values[1];
    persons[index].password = values[2];
    persons[index].address = values[3];
    persons[index].phone = values[4];
    persons[index].role = activeUser.role;
    updatePersonsLocalStorage();
}

function saveNewRow() {
    if (confirm("Proceed to save?")) {
        let index = persons.findIndex(Person => Person.id == activeUser.id);
        let inputs = document.querySelectorAll(".inputs");
        let UserData = [];
        for (let i = 0; i < inputs.length; i++) {
            UserData.push(inputs[i].value);
        }
        setPerson(index, UserData);
        activeUser = (persons[index])
        localStorage.setItem("Active User", JSON.stringify(activeUser))
        location = "CustomerProfile.html";
    }
}
document.querySelectorAll('form')[0].addEventListener('submit', function (event) {
    this.classList.add('was-validated');
    let email = document.getElementById("floatingEmail").value;
    let phone = document.getElementById("floatingPhone").value;
    if (this.checkValidity()) {
        if (checkEmail(email) && activeUser.email != email) {
            event.preventDefault();
            event.stopPropagation();
            alert("This email is already in use.");
            resetValidation();
            return;
        }
        else if (checkPhone(phone) && activeUser.phone != phone) {
            event.preventDefault();
            event.stopPropagation();
            alert("This phone number is already in use.");
            resetValidation();
            return;
        }
        else {
            saveNewRow(event);
        }
    }
    else {
        event.preventDefault();
        event.stopPropagation();
    }
});
document.getElementById("editIcon").addEventListener("click", editRow()); // end of edit function