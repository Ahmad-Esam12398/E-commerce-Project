import {persons, products} from "./data.js";
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
        tableData.style.display = "flex";
        tableData.style.justifyContent = "space-around";
        tableData.style.alignItems = "center";
        tableData.style.height = "100%";
        let editButton = document.createElement("i");
        editButton.className = "fa-regular fa-pen-to-square";
        editButton.style.cursor = "pointer";
        editButton.addEventListener("click", editRow);
        let deleteButton = document.createElement("i");
        deleteButton.className = "fa fa-trash";
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
}

createTableProducts();
function AddButton(){
    let lowerTable = document.getElementById("lowerTable");
    lowerTable.innerHTML = "";
    let addButton = document.createElement("i");
    addButton.innerHTML = "Add";
    addButton.className = "btn btn-primary";
    addButton.setAttribute("data-bs-toggle", "modal");
    addButton.setAttribute("data-bs-target", "#staticBackdrop");
    addButton.onclick = getOptions;
    lowerTable.appendChild(addButton);
}
function getOptions(){
    let sellersIds = [];
    for(let i = 0; i < persons.length; i++){
        if(persons[i].role == "Seller"){
            sellersIds.push(persons[i].id);
        }
    }
    document.getElementById("sellerID").innerHTML = "";
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


function editRow(e) {
    let row = e.target.parentElement.parentElement;
    let rowChildren = row.children;
    let rowChildrenLength = rowChildren.length;
    let rowChildrenValues = [];
    for(let i = 0; i < rowChildrenLength - 1; i++) {
        rowChildrenValues.push(rowChildren[i].innerText);
    }
    let editRow = document.createElement('tr');
    for(let i = 0; i < rowChildrenLength; i++) {
        let td = document.createElement('td');

        if(i === 0) { 
            td.textContent = rowChildrenValues[i]; 
        }
        else if(i === rowChildrenLength - 1) {
            break;
        }
        else {
            let input = document.createElement('input');
            input.type = 'text';
            input.value = rowChildrenValues[i];
            input.style.width = '100%';
            td.appendChild(input);
        }

        editRow.appendChild(td);
    }
    let td = document.createElement('td');
    let saveButton = document.createElement('i');
    saveButton.className = 'fa-regular fa-floppy-disk';
    saveButton.style.cursor = 'pointer';
    saveButton.addEventListener('click', saveRow);
    td.appendChild(saveButton);
    editRow.appendChild(td);
    row.parentElement.insertBefore(editRow, row);
    row.remove();
}

function saveRow(){};

function saveNewRow(e) {
    if(confirm("Are you sure you want to save this product?")) {
        let row = e.target.parentElement.parentElement;
        // debugger;
        let rowChildren = row.children;
        let rowChildrenLength = rowChildren.length;
        let rowChildrenValues = [];
        for(let i = 1; i < rowChildrenLength - 1; i++) {
            console.log(rowChildren[i]);
            rowChildrenValues.push(rowChildren[i].children[0].value);
        }
        let newProduct = new Product(...rowChildrenValues);
        products.push(newProduct);
        row.remove();
        createTableProducts();
    }
}
function deleteRow(e) {
    let row = e.target.parentElement.parentElement;
    row.remove();
}
document.querySelectorAll('form')[0].addEventListener('submit', function(event) {
    event.preventDefault();
    // Check if the form is valid
    if(!event.target.checkValidity()){
        event.preventDefault();
        event.stopPropagation();
    }
    else{
        addProductRow();
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

