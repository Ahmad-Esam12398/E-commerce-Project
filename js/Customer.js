// import { createTableOrders } from "./deleteme.js";

// // import { createTableOrders } from "./AdminOrders";
// createTableOrders();
let activeUser = JSON.parse(localStorage.getItem("Active User"));

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

namep.style.color = "black";
emailp.style.color = "black";
addressp.style.color = "black";
phonep.style.color = "black";
rolep.style.color = "black";

custname.appendChild(namep)
custemail.appendChild(emailp)
custaddress.appendChild(addressp)
custphone.appendChild(phonep)
custrole.appendChild(rolep)