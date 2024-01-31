import { products } from "./data.js";
let productsArr = [];
if (localStorage.getItem("products") == null) {
    for (let i = 0; i < products.length; i++) {
        productsArr.push(products[i].getProduct());
    }
    localStorage.setItem("products", JSON.stringify(productsArr))
}
productsArr = localStorage.getItem("products");

let cart = null;
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
                product.cardquantity = 1;
                listCard.innerHTML = "";
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
    reloadTable();
}
function removeProductFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        saveCartToLocalStorage();
        reloadCard();
    }
}
function CreateTable(targetTable, orderObjects) {
    targetTable.innerHTML = '';
    for (const key in orderObjects) {
        // create table row 
        let tr = document.createElement("tr");
        // create td for each element
        let imgholder = document.createElement("td");
        let img = document.createElement("img");
        let name = document.createElement("td");
        let price = document.createElement("td");
        let quantity = document.createElement("td");
        let subtotal = document.createElement("td");
        let closebtn = document.createElement("td");
        // setting photo source
        img.setAttribute("src", `${orderObjects[key].image}`);
        img.style.width = "100px"
        imgholder.appendChild(img);
        // name
        name.innerText = orderObjects[key].name;
        name.style.color = "black";
        name.style.fontWeight = "bold";
        //price
        price.innerText = `$${orderObjects[key].price}`;
        //quantity
        quantity.innerHTML = `<div class="d-flex plusevent">
                                <span class="d-inline-block changenum minus">-</span>
                                <span class="d-inline-block changenum num">${orderObjects[key].cardquantity}</span>
                                <span class="d-inline-block changenum plus">+</span>
                            </div>`
        const minuss = quantity.querySelector('.minus');
        const pluss = quantity.querySelector('.plus');

        minuss.addEventListener('click', function () {
            changequantity(orderObjects[key].id, -1);
        });

        pluss.addEventListener('click', function () {
            changequantity(orderObjects[key].id, 1);
        });
        //subtotal
        subtotal.innerText = `$${orderObjects[key].price * orderObjects[key].cardquantity}`;
        subtotal.classList.add("subtotalV");
        // close button
        closebtn.innerHTML =
            `<button class="border-0 rounded-5 bg-body">
            <i class="fa-regular fa-circle-xmark"></i>
            </button>`;
        // appending them all to the row
        tr.appendChild(imgholder);
        tr.appendChild(name);
        tr.appendChild(price);
        tr.appendChild(quantity);
        tr.appendChild(subtotal);
        tr.appendChild(closebtn);
        closebtn.addEventListener("click", () => removeProductFromCart(orderObjects[key].id));
        // appending the row to the table body
        targetTable.appendChild(tr);
    }
}

function generateCard(cardContainer, productDetails) {
    // Create a new div element with the card structure
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card d-block d-lg-none productContainer';
    // Card Header
    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerHTML = `<button class="d-flex  border-0 rounded-5 bg-transparent">
    <i class="fa-regular fa-circle-xmark"></i>
    </button>`
    cardDiv.appendChild(cardHeader);
    // Card Body
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    // Product Image
    let imgholder = document.createElement("div");
    var img = document.createElement('img');
    img.classList.add("w-50")
    img.src = productDetails.image;
    imgholder.classList.add("d-flex", "justify-content-center")
    imgholder.appendChild(img);
    cardBody.appendChild(imgholder);
    // Product Name
    var productName = document.createElement('div');
    productName.classList.add("d-flex", "justify-content-between")
    productName.innerHTML = 'Product<p class="d-flex justify-content-end">' + productDetails.name + '</p>';
    cardBody.appendChild(productName);
    // Product Price
    var productPrice = document.createElement('div');
    productPrice.classList.add("d-flex", "justify-content-between")
    productPrice.innerHTML = 'Price<p class="d-flex justify-content-end">' + productDetails.price + '</p>';
    cardBody.appendChild(productPrice);
    // Product Quantity
    var productQuantity = document.createElement('div');
    productQuantity.classList.add("d-flex", "justify-content-between")
    productQuantity.innerHTML = `Quantity<div class="plusevent d-flex justify-content-end">
                                <span class="d-inline-block minus">-</span>
                                <span class="d-inline-block num">${productDetails.cardquantity}</span>
                                <span class="d-inline-block plus">+</span>
                            `
    const minuss = productQuantity.querySelector('.minus');
    const pluss = productQuantity.querySelector('.plus');

    minuss.addEventListener('click', function () {
        changequantity(productDetails.id, -1);
    });

    pluss.addEventListener('click', function () {
        changequantity(productDetails.id, 1);
    });
    cardBody.appendChild(productQuantity);
    // Subtotal
    var subtotal = document.createElement('div');
    console.log(productDetails.price)
    subtotal.classList.add("d-flex", "justify-content-between")
    subtotal.innerHTML = `Subtotal<p class="d-flex justify-content-end">$${productDetails.price * productDetails.cardquantity}</p>`;
    cardBody.appendChild(subtotal);
    // appending cardbody with the product details to the card div
    cardDiv.appendChild(cardBody);
    // return the card
    return cardDiv
}
function generateAllCards(cart) {
    var container = document.getElementById("ProductsCards");
    container.innerHTML = "";
    for (const key in cart) {
        container.appendChild(generateCard(container, cart[key]));
    }
}
function reloadTable() {
    let newtablebody = document.getElementsByTagName("tbody")[0];
    CreateTable(newtablebody, cart);
    generateAllCards(cart);
    updateTotal();
}
function updateTotal() {
    let subtotals = document.getElementsByClassName("subtotalV");
    let subtotalAddition = 0;
    for (let i = 0; i < subtotals.length; i++) {
        subtotalAddition += Number((subtotals[i].innerText).substr(1));
    }
    document.getElementsByClassName("subtotalVal")[0].innerText = ` $${subtotalAddition}`;
    document.getElementsByClassName("totalVal")[0].innerText = ` $${subtotalAddition}`;
}

const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const cardquantity = document.querySelector('.cardquantity');
reloadCard();
window.addEventListener("load", () => {
    let tablebody = document.getElementsByTagName("tbody")[0];
    CreateTable(tablebody, cart);
    generateAllCards(cart);
    updateTotal();
})// end of load