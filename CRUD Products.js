import {products} from "./data.js";
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
    let upperTable = document.getElementById("upperTable");
    upperTable.innerHTML = "";
    let addButton = document.createElement("i");
    addButton.className = "fas fa-plus";
    addButton.style.cursor = "pointer";
    upperTable.appendChild(addButton);
    addButton.addEventListener("click", addProductRow);
}

function addProductRow() {
    let myTableBody = document.querySelectorAll('tbody')[0];
    let newRow = document.createElement("tr");

    for(let key in products[0].getProduct()) {
        let td = document.createElement('td');
        if(key === 'id') {
            td.innerHTML = Product.lastID + 1;
        }
        if(key !== 'id') {
            let input = document.createElement('input');
            input.type = 'text';
            input.placeholder = key;
            input.style.width = '100%';
            td.appendChild(input);
        }
        newRow.appendChild(td);
    }
    let td = document.createElement('td');
    let saveButton = document.createElement('i');
    saveButton.className = 'fa-regular fa-floppy-disk';
    saveButton.style.cursor = 'pointer';
    saveButton.addEventListener('click', saveNewRow);
    td.appendChild(saveButton);
    newRow.appendChild(td);
    myTableBody.appendChild(newRow);
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

