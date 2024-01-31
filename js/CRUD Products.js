import {products as originalProducts, persons as originalPersons} from "./data.js";
import {Product} from "./productsmodule.js";

if(JSON.parse(localStorage.getItem("Active User")).role != "Admin"){
    alert("You are not authorized to access this page.")
    window.location.href = "./home.html";
  }

if(localStorage.getItem("Persons") == null){
    let plainPersons = originalPersons.map((item)=> item.getPerson());
    localStorage.setItem("Persons", JSON.stringify(plainPersons));
    // console.log(JSON.parse(localStorage.getItem("Persons")));
}
if(localStorage.getItem("products") == null){
    debugger;
    let plainProducts = originalProducts.map((item)=>item.getProduct());
    localStorage.setItem("products", JSON.stringify(plainProducts));
}
// let plainProducts = products.map((item)=>item.getProduct());
// localStorage.setItem("products", JSON.stringify(plainProducts));
let persons = JSON.parse(localStorage.getItem("Persons"));
let products = JSON.parse(localStorage.getItem("products"));
function updateProductsLocalStorage(){
    localStorage.setItem("products", JSON.stringify(products));
}

function createTableProducts(){
    let myTable = document.getElementById("myTable");
    let tableHead = document.getElementsByTagName("thead")[0];
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    let tableRow = document.createElement("tr");
    for(let key in products[0]){
        let tableHeadData = document.createElement("th");
        if(key == "categoryPath" || key == "otherCategory" || key == "description"){
            continue;
        }
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
        for(let key in products[i]){
            if(key == "categoryPath" || key == "otherCategory" || key == "description"){
                continue;
            }
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
                tableData.innerHTML = products[i][key];
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
        editButton.onclick = getOptions;
        editButton.addEventListener("click", editRow);
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#staticBackdrop");
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
        document.forms[0].classList.remove("was-validated");
        operation = "add";
        let button = document.querySelectorAll("button[type='submit']")[0];
        // console.log(button);
        button.innerHTML = "Add";
        let inputs = document.querySelectorAll(".inputs");
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    });
    lowerTable.appendChild(addButton);
}
function getOptions(){
    // debugger;
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
function getLastProductId(arr){
    return arr[arr.length - 1].id + 1;
}
function addProductRow() {
    let id = getLastProductId(products);
    let name = document.getElementById("floatingName").value;
    let price = document.getElementById("floatingPrice").value;
    let quantity = document.getElementById("floatingQuantity").value;
    let description = document.getElementById("floatingDescription").value;
    let image = document.getElementById("floatingImage").value;
    let sellerID = document.getElementById("sellerID").value;
    let category = document.getElementById("Room").value;
    // debugger;
    let newProduct = new Product(id, name, price, quantity, description, image, sellerID, category);
    products.push(newProduct.getProduct());
    updateProductsLocalStorage();
    createTableProducts();
}

let id = -1;
function editRow(e) {
    let row = e.target.parentElement.parentElement;
    let rowChildren = row.children;
    debugger;
    let rowChildrenLength = rowChildren.length;
    let rowChildrenValues = [];
    for(let i = 0; i < rowChildrenLength - 1; i++) {
        if(i == 4){
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
    debugger;
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = rowChildrenValues[i + 1];
    }
    // inputs[5].value = 6;
    // console.log(inputs[5]);
    // console.log(inputs[5]);
    let saveButton = document.querySelectorAll("button[type='submit']")[0];
    saveButton.innerHTML = "Save";
    operation = "edit";
}
function setProduct(index, rowChildrenValues){
    products[index].name = rowChildrenValues[0];
    products[index].price = rowChildrenValues[1];
    products[index].quantity = rowChildrenValues[2];
    products[index].description = rowChildrenValues[3];
    products[index].image = rowChildrenValues[4];
    products[index].sellerID = rowChildrenValues[5];
    products[index].category = rowChildrenValues[6];
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
        setProduct(index, rowChildrenValues);
        updateProductsLocalStorage();
        createTableProducts();
    }
}
function deleteRow(e) {
    if(confirm("Are you sure you want to delete this product?")) {
        let row = e.target.parentElement.parentElement;
        let id = row.children[0].innerText;
        let index = products.findIndex(product => product.id == id);
        // console.log(index);
        products.splice(index, 1);
        updateProductsLocalStorage();
        createTableProducts();
    }
}
document.querySelectorAll('form')[0].addEventListener('submit', function(event) {
    event.preventDefault();
    // Check if the form is 
    event.preventDefault();
    event.stopPropagation();
    if(this.checkValidity()){
        if(operation == "edit"){
            saveNewRow(event);
        }
        else if(operation == "add"){
            addProductRow();
        }
    }
    this.classList.add('was-validated');
});
let searchdiv = document.getElementsByClassName("searchbutton")[0];
searchdiv.children[0].addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        searchTable();
    }
});
searchdiv.children[1].addEventListener("click", searchTable);
function searchTable(){
    let searchInput = searchdiv.children[0].value.trim();
    if (searchInput.trim() == "") {
        createTableProducts();
        document.querySelectorAll(".form-check div input").forEach(input => input.checked = true);
        return;
    }
    let allTableRows = [...document.querySelectorAll("tbody tr")];
    let tableRows = allTableRows.filter(tr => tr.classList.contains("d-none") == false); 
    tableRows.forEach(tr => tr.style.display = "");   
    // console.log(tableRows);
    // console.log(allTableRows);
    let found = false;
    for(let i = 0; i < tableRows.length; i++){
        let tableData = tableRows[i].children;
        for(let j = 0; j < tableData.length; j++){
            if(tableData[j].innerHTML.toLowerCase().indexOf(searchInput.toLowerCase()) != -1){
                found = true;
                break;
            }
        }
        if(found == false){
            tableRows[i].style.display = "none";
        }
        found = false;
    }
}
document.querySelectorAll(".form-check div input").forEach(input => input.addEventListener("click", function(){
    if(this.checked){
        filterTableChecked(this.value);
    }
    else{
        filterTableUnChecked(this.value);
    }
}));
function filterTableChecked(criteria){
    let tableRows = document.getElementsByTagName("tbody")[0].children;
    for(let i = 0; i < tableRows.length; i++){
        let tableData = tableRows[i].children;
        // console.log(tableData[6].innerHTML);
        if(tableData[6].innerHTML == criteria){
            tableRows[i].classList.remove("d-none");
        }
    }
}
function filterTableUnChecked(criteria){
    debugger;
    let tableRows = document.getElementsByTagName("tbody")[0].children;
    for(let i = 0; i < tableRows.length; i++){
        let tableData = tableRows[i].children;
        // console.log(tableData[6].innerHTML);
        if(tableData[6].innerHTML == criteria){
            tableRows[i].classList.add("d-none");
        }
    }
}
function resetValidation(){
    document.forms[0].classList.remove("was-validated");
    console.log("reset");
}
document.querySelectorAll("#staticBackdrop > div > div > div.modal-footer > button.btn.btn-secondary")[0].addEventListener("click", resetValidation);
document.querySelectorAll("#staticBackdrop > div > div > div.modal-header > button")[0].addEventListener("click", resetValidation);