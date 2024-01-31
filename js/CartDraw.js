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
        img.setAttribute("width", "50px");
        imgholder.appendChild(img);
        // name
        name.innerText = orderObjects[key].name;
        name.style.color = "black";
        name.style.fontWeight = "bold";
        //price
        price.innerText = `$${orderObjects[key].price}`;
        //quantity
        quantity.innerText = orderObjects[key].cardquantity
        //subtotal
        subtotal.innerText = `$${orderObjects[key].price * orderObjects[key].cardquantity}`;
        subtotal.classList.add("subtotalV");
        // close button
        closebtn.innerHTML =
            `<button class="border-0 rounded-5 bg-body">
            <i class="fa-regular fa-circle-xmark"></i>
            </button>`
        // appending them all to the row
        tr.appendChild(imgholder);
        tr.appendChild(name);
        tr.appendChild(price);
        tr.appendChild(quantity);
        tr.appendChild(subtotal);
        tr.appendChild(closebtn);
        // appending the row to the table body
        targetTable.appendChild(tr);
    }
}

function generateCard(containerId, productDetails) {
    // Get the container element
    var container = document.getElementById("ProductsCards");
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
    img.src = productDetails.image;
    img.style.width = "100px";
    img.alt = '';
    imgholder.classList.add("d-flex", "justify-content-between")
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
    productQuantity.innerHTML = 'Quantity<p class="d-flex justify-content-end">' + productDetails.cardquantity + '</p>';
    cardBody.appendChild(productQuantity);
    // Subtotal
    var subtotal = document.createElement('div');
    console.log(productDetails.price)
    subtotal.classList.add("d-flex", "justify-content-between")
    subtotal.innerHTML = `Subtotal<p class="d-flex justify-content-end">$${productDetails.price * productDetails.cardquantity}</p>`;
    cardBody.appendChild(subtotal);
    // appending cardbody with the product details to the card div
    cardDiv.appendChild(cardBody);
    // Append the card to the container
    container.appendChild(cardDiv);
}

window.addEventListener("load", () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        alert("Nothing in the Cart!");
        window.location.href = "home.html";
    }
    let tablebody = document.getElementsByTagName("tbody")[0];
    CreateTable(tablebody, cart);
    for (const key in cart) {
        generateCard(ProductsCards, cart[key]);
    }
    let subtotals = document.getElementsByClassName("subtotalV");
    let subtotalAddition = 0;
    for (let i = 0; i < subtotals.length; i++) {
        subtotalAddition += Number((subtotals[i].innerText).substr(1));
        // console.log((subtotals[i].innerText).substr(1));
        // console.log(subtotalAddition)
    }
    document.getElementsByClassName("subtotalVal")[0].innerText += ` ${subtotalAddition}`;
    document.getElementsByClassName("totalVal")[0].innerText += ` ${subtotalAddition}`;
})// end of load