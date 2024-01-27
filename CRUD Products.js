import {products, persons} from "./data.js";
import {Product} from "./products module.js";
function createTableProducts(){
    let myTable = document.getElementById("myTable");
    let tableHead = document.getElementsByTagName("thead")[0];
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    let tableRow = document.createElement("tr");
    for(let key in products[0].getProduct()){
        let tableHeadData = document.createElement("th");
        tableHeadData.innerHTML = key;
        tableRow.appendChild(tableHeadData);
    }
    let tableHeadData = document.createElement("th");
    tableHeadData.innerHTML = "Actions";
    tableRow.appendChild(tableHeadData);
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
        let tableData = document.createElement("td");
        tableData.style.alignItems = "center";
        tableData.style.height = "100%";
        let editButton = document.createElement("button");
        editButton.className = "btn btn-outline-warning";
        editButton.innerHTML = "Edit";
        editButton.style.marginRight = "5px";
        editButton.style.cursor = "pointer";
        editButton.addEventListener("click", editRow);
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#staticBackdrop");
        editButton.onclick = getOptions;
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-outline-danger";
        deleteButton.innerHTML = "Delete";
        deleteButton.style.cursor = "pointer";
        deleteButton.addEventListener("click", deleteRow);
        tableData.appendChild(editButton);
        tableData.appendChild(deleteButton);
        tableRow.appendChild(tableData);
        tableBody.appendChild(tableRow);
        myTable.appendChild(tableBody);
    }
    myTable.appendChild(tableHead);
    AddButton();
};
createTableProducts();
let operation = "";
createTableProducts();
function AddButton(){
    let lowerTable = document.getElementById("lowerTable");
    lowerTable.innerHTML = "";
    let addButton = document.createElement("i");
    addButton.innerHTML = "Add";
    addButton.className = "btn btn-outline-primary";
    addButton.setAttribute("data-bs-toggle", "modal");
    addButton.setAttribute("data-bs-target", "#staticBackdrop");
    addButton.onclick = getOptions;
    addButton.addEventListener("click", function(){
        operation = "add";
        let button = document.querySelectorAll("button[type='submit']")[0];
        // console.log(button);
        button.innerHTML = "Add";
    });
    lowerTable.appendChild(addButton);
}
function getOptions(){
    let sellersIds = [];
    for(let i = 0; i < persons.length; i++){
        if(persons[i].role == "Seller"){
            sellersIds.push(persons[i].id);
        }
    }
    document.getElementById("sellerID").innerHTML = `<option selected disabled value="">Seller ID</option>`;
    sellersIds.forEach(id => {
        let option = document.createElement("option");
        option.value = id;
        option.innerHTML = id;
        document.getElementById("sellerID").appendChild(option);
    });
}
function validateForm() {
    let name = document.getElementById("floatingName").value;
    let price = document.getElementById("floatingPrice").value;
    let quantity = document.getElementById("floatingQuantity").value;
    let description = document.getElementById("floatingDescription").value;
    let image = document.getElementById("floatingImage").value;
    if(name.trim() == "" || isNaN(price) || +price == 0 || isNaN(quantity) || +quantity == 0 || description.trim() == "" || image.trim() == "" || image.trim().indexOf(".") == -1){
        alert("Please Input valid data");
        return false;
    }
    else{
        return true;
    }
}
function addProductRow() {
    if(validateForm()){
        let name = document.getElementById("floatingName").value;
        let price = document.getElementById("floatingPrice").value;
        let quantity = document.getElementById("floatingQuantity").value;
        let description = document.getElementById("floatingDescription").value;
        let image = document.getElementById("floatingImage").value;
        let sellerID = document.getElementById("sellerID").value;
        let newProduct = new Product(name, price, quantity, description, image, sellerID);
        products.push(newProduct);
        createTableProducts();
    }
}

let id = -1;
function editRow(e) {
    let row = e.target.parentElement.parentElement;
    let rowChildren = row.children;
    let rowChildrenLength = rowChildren.length;
    let rowChildrenValues = [];
    for(let i = 0; i < rowChildrenLength - 1; i++) {
        if(i == 5){
            let img = rowChildren[i].children[0];
            rowChildrenValues.push(img.src);
        }
        else{
            rowChildrenValues.push(rowChildren[i].innerText);
        }
        // console.log(rowChildren[i]);
    }
    //want to replace the row with a form modal like one in add product
    let inputs = document.querySelectorAll(".inputs");
    id = -1;
    id = rowChildrenValues[0];
    // console.log(inputs);
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = rowChildrenValues[i + 1];
    }
    let saveButton = document.querySelectorAll("button[type='submit']")[0];
    saveButton.innerHTML = "Save";
    operation = "edit";
    // console.log(products);
}

function saveNewRow() {
    if(confirm("Are you sure you want to save this product?")) {
        let index = products.findIndex(product => product.id == id);
        let rowChildrenValues = [];
        let inputs = document.querySelectorAll(".inputs");
        for(let i = 0; i < inputs.length; i++) {
            rowChildrenValues.push(inputs[i].value);
        }
        // console.log(rowChildrenValues);
        products[index].setProduct(...rowChildrenValues);
        createTableProducts();
    }
}
function deleteRow(e) {
    if(confirm("Are you sure you want to delete this product?")) {
        let row = e.target.parentElement.parentElement;
        let id = row.children[0].innerText;
        let index = products.findIndex(product => product.id == id);
        console.log(index);
        products.splice(index, 1);
        createTableProducts();
    }
}
document.querySelectorAll('form')[0].addEventListener('submit', function(event) {
    event.preventDefault();
    // Check if the form is valid
    if(!event.target.checkValidity()){
        event.preventDefault();
        event.stopPropagation();
    }
    else{
        if(operation == "edit"){
            saveNewRow(event);
            operation = "";
        }
        else{
            addProductRow();
            operation = "";
        }
    }
    event.target.classList.add('was-validated');
});
document.getElementById("floatingName").addEventListener("input", function(){
    // console.log(this);
    if(this.value.trim().length < 2){
        this.classList.add("is-invalid");
    }
    else{
        this.classList.remove("is-invalid");
    }
});
document.getElementById("floatingPrice").addEventListener("input", function(){
    // console.log(this);
    if(isNaN(this.value) || +this.value <= 0){
        this.classList.add("is-invalid");
    }
    else{
        this.classList.remove("is-invalid");
    }
});
document.getElementById("floatingQuantity").addEventListener("input", function(){
    // console.log(this);
    if(isNaN(this.value) || +this.value <= 0){
        this.classList.add("is-invalid");
    }
    else{
        this.classList.remove("is-invalid");
    }
});
document.getElementById("floatingDescription").addEventListener("input", function(){
    // console.log(this);
    if(this.value.trim().length < 10){
        this.classList.add("is-invalid");
    }
    else{
        this.classList.remove("is-invalid");
    }
});
document.getElementById("floatingImage").addEventListener("input", function(){
    // console.log(this);
    if(this.value.trim().indexOf(".") == -1){
        this.classList.add("is-invalid");
    }
    else{
        this.classList.remove("is-invalid");
    }
});
document.getElementById("sellerID").addEventListener("input", function(){
    if(this.value.trim() == ""){
        this.classList.add("is-invalid");
    }
    else{
        this.classList.remove("is-invalid");
    }
});

