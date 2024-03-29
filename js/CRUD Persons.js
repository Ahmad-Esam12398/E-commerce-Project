import { persons as originalPersons, originalOrders as initialOrders } from "./data.js";
import { Person } from "./person.js";


if(JSON.parse(localStorage.getItem("Active User")) == null || JSON.parse(localStorage.getItem("Active User")).role != "Admin"){
    alert("You are not authorized to access this page.")
    window.location.href = "../home.html";
}
  

if(localStorage.getItem("Persons") == null){
    let plainPersons = originalPersons.map((item)=> item.getPerson());
    localStorage.setItem("Persons", JSON.stringify(plainPersons));
    // console.log(JSON.parse(localStorage.getItem("Persons")));
}
if(localStorage.getItem("originalOrders") == null){
    localStorage.setItem("originalOrders", JSON.stringify(initialOrders));
}
let persons = JSON.parse(localStorage.getItem("Persons"));
let orders = JSON.parse(localStorage.getItem("originalOrders"));
let products = JSON.parse(localStorage.getItem("products"));
function updatePersonsLocalStorage(){
    localStorage.setItem("Persons", JSON.stringify(persons));
}
function updateOrdersLocalStorage(){
    localStorage.setItem("originalOrders", JSON.stringify(orders));
}
function createTablePersons(){
    let myTable = document.getElementById("myTable");
    let tableHead = document.getElementsByTagName("thead")[0];
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    let tableRow = document.createElement("tr");
    for(let key in persons[0]){
        let tableHeadData = document.createElement("th");
        tableHeadData.innerHTML = key;
        tableRow.appendChild(tableHeadData);
    }
    // debugger;
    let tableHeadData = document.createElement("th");
    tableHeadData.innerHTML = "Actions";
    tableRow.appendChild(tableHeadData);
    tableHead.appendChild(tableRow);
    myTable.appendChild(tableHead);
    for(let i = 0; i < persons.length; i++){
        tableRow = document.createElement("tr");
        // if(localStorage.getItem("Active User").email == persons[i].email){
        //     continue;
        // }
        for(let key in persons[i]){
            let tableData = document.createElement("td");
            tableData.innerHTML = persons[i][key];
            tableRow.appendChild(tableData);
        }
        let tableData = document.createElement("td");
        tableData.style.alignItems = "center";
        tableData.style.height = "100%";
        // debugger;
        // console.log(JSON.parse(localStorage.getItem("Active User")));
        if(JSON.parse(localStorage.getItem("Active User")).email != persons[i].email){
            let deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-outline-danger";
            deleteButton.innerHTML = "Delete";
            deleteButton.style.cursor = "pointer";
            deleteButton.addEventListener("click", deleteRow);
            tableData.appendChild(deleteButton);
        }
        let editButton = document.createElement("button");
        editButton.className = "btn btn-outline-warning";
        editButton.innerHTML = "Edit";
        editButton.style.marginRight = "5px";
        editButton.style.cursor = "pointer";
        editButton.addEventListener("click", editRow);
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#staticBackdrop");
        tableData.appendChild(editButton);
        tableRow.appendChild(tableData);
        tableBody.appendChild(tableRow);
        myTable.appendChild(tableBody);
    }
    myTable.appendChild(tableHead);
    AddButton();
};
createTablePersons();
let operation = "";

function AddButton(){
    let lowerTable = document.getElementById("lowerTable");
    // document.forms[0].classList.remove("was-validated");
    lowerTable.innerHTML = "";
    let addButton = document.createElement("i");
    addButton.innerHTML = "Add";
    addButton.className = "btn btn-outline-primary";
    addButton.setAttribute("data-bs-toggle", "modal");
    addButton.setAttribute("data-bs-target", "#staticBackdrop");
    addButton.addEventListener("click", function(){
        debugger;
        // console.log(document.forms[0]);
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
let uniqueEmails = new Set();
let uniquePhoneNumbers = new Set();

function getLastId(arr){
    return arr[arr.length - 1].id + 1;
}

function addPersonRow() {
    debugger;
    let Id = getLastId(persons);
    let name = document.getElementById("floatingName").value;
    let email = document.getElementById("floatingEmail").value;
    let password = document.getElementById("floatingPassword").value;
    let address = document.getElementById("floatingAddress").value;
    let phone = document.getElementById("floatingPhone").value;
    let role = document.getElementById("PersonRole").value;
    // debugger;
    let newPerson = new Person(Id, name, email, password, address, phone, role);
    // console.log(newPerson.getPerson());
    persons.push(newPerson.getPerson());
    updatePersonsLocalStorage();
    createTablePersons();
}
let id = -1;
let currentEmail = "";
let currentPhone = "";
function editRow(e) {
    // debugger;
    document.forms[0].classList.remove("was-validated");
    let row = e.target.parentElement.parentElement;
    let rowChildren = row.children;
    let rowChildrenLength = rowChildren.length;
    let rowChildrenValues = [];
    for(let i = 0; i < rowChildrenLength - 1; i++) {
        rowChildrenValues.push(rowChildren[i].innerText);
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
    currentEmail = document.getElementById("floatingEmail").value;
    currentPhone = document.getElementById("floatingPhone").value;
    // console.log(products);
}
function setPerson(index, values){
    persons[index].name = values[0];
    persons[index].email = values[1];
    persons[index].password = values[2];
    persons[index].address = values[3];
    persons[index].phone = values[4];
    persons[index].role = values[5];
    updatePersonsLocalStorage();
}

function saveNewRow() {
    if(confirm("Are you sure you want to save this Person?")) {
        let index = persons.findIndex(Person => Person.id == id);
        let rowChildrenValues = [];
        let inputs = document.querySelectorAll(".inputs");
        for(let i = 0; i < inputs.length; i++) {
            rowChildrenValues.push(inputs[i].value);
        }
        // console.log(rowChildrenValues);
        // persons[index].setPerson(...rowChildrenValues);
        setPerson(index, rowChildrenValues);
        createTablePersons();
    }
}
function deleteRow(e) {
    if(confirm("Are you sure you want to delete this Person?")) {
        debugger;
        let row = e.target.parentElement.parentElement;
        let id = row.children[0].innerText;
        let index = persons.findIndex(product => product.id == id);
        // console.log(index);
        if(persons[index].role == "Seller"){
            let sellerProducts = products.filter(product => product.sellerID == persons[index].id);
            if(sellerProducts.length != 0){
                alert("This seller has products. Please delete them first.");
                return;
            }
            else if(!confirm("This seller has no products. Do you want to delete it?")){
                return;
            }
        }
        else if(persons[index].role == "Customer"){
            let customerOrders = orders.filter(order => order.customerId == persons[index].id);
            let flag = false;
            if(customerOrders.length != 0){
                alert("This customer has orders. Please delete them first.");
                return;
            }
            else{
                if(!confirm("This customer has no orders. Do you want to delete it?")){
                    return;
                }
            }
        }
        persons.splice(index, 1);
        updatePersonsLocalStorage();
        createTablePersons();
    }
}
// function addCustomValidation(element, conditionFun){
//     if(conditionFun()){
//         element.setCustomValidity("invalid");
//     }
//     else{
//         element.setCustomValidity("");
//     }
//     element.addEventListener('input', function(event) {
//         if(conditionFun()){
//             element.setCustomValidity('invalid');
//         }
//         else{
//             element.setCustomValidity('');
//         }
//     }, false);
// }
document.querySelectorAll('form')[0].addEventListener('submit', function(event) {
    // Check if the form is valid

    // let nameInput = document.getElementById("floatingName");
    // let namePattern = new RegExp("[a-z A-Z]{5, }");
    // let emailInput = document.getElementById("floatingEmail");
    // let passwordInput = document.getElementById("floatingPassword");
    // let addressInput = document.getElementById("floatingAddress");
    // let phoneInput = document.getElementById("floatingPhone");
    // let roleInput = document.getElementById("PersonRole");
    // addCustomValidation(nameInput, ()=> namePattern.test(nameInput.value) == false);
    debugger;
    this.classList.add('was-validated');
    let email = document.getElementById("floatingEmail").value;
    let phone = document.getElementById("floatingPhone").value;
    persons.forEach(person => {uniqueEmails.add(person.email.toLowerCase());
        uniquePhoneNumbers.add(person.phone);
    });
    if(this.checkValidity()){
        if(uniqueEmails.has(email.toLowerCase()) && currentEmail.toLowerCase() != email.toLowerCase()){
            event.preventDefault();
            event.stopPropagation();
            alert("This email is already in use.");
            resetValidation();
            return;
        }
        else if(uniquePhoneNumbers.has(phone) && currentPhone != phone){
            event.preventDefault();
            event.stopPropagation();
            alert("This phone number is already in use.");
            resetValidation();
            return;
        }
        else{
            if(operation == "edit"){
                saveNewRow(event);
            }
            else if(operation == "add"){
                addPersonRow();
            }
            currentEmail = "";
            currentPhone = "";
        }
        // var myModal = document.getElementById('staticBackdrop');
        // myModal
    }
    else{
        event.preventDefault();
        event.stopPropagation();
    }
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
        createTablePersons();
        document.getElementById("flexSwitchCheckAdmin").checked = true;
        document.getElementById("flexSwitchCheckSeller").checked = true;
        document.getElementById("flexSwitchCheckCustomer").checked = true;
        return;
    }

    let allTableRows = [...document.querySelectorAll("tbody tr")];
    let tableRows = allTableRows.filter(tr => tr.classList.contains("d-none") == false); 
    tableRows.forEach(tr => tr.style.display = "");   
    console.log(tableRows);
    console.log(allTableRows);
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
document.getElementById("flexSwitchCheckAdmin").addEventListener("click", function(){
    if(this.checked){
        filterTableChecked("Admin");
    }
    else{
        filterTableUnChecked("Admin");
    }
});
document.getElementById("flexSwitchCheckSeller").addEventListener("click", function(){
    if(this.checked){
        filterTableChecked("Seller");
    }
    else{
        filterTableUnChecked("Seller");
    }
});
document.getElementById("flexSwitchCheckCustomer").addEventListener("click", function(){
    if(this.checked){
        filterTableChecked("Customer");
    }
    else{
        filterTableUnChecked("Customer");
    }
});
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
//Show password
document.getElementById("ShowPassword").addEventListener("click", function () {
    var x = document.getElementById("floatingPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});
// to sort the table
let sortDirection = false; // false = ascending, true = descending
function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    let rows = Array.from(tbody.querySelectorAll('tr'));
    rows = rows.filter(tr => tr.classList.contains("d-none") == false);
    rows = rows.filter(tr => tr.style.display != "none");


    // Sort rows based on the content of the specified column
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();

        // Convert to number if possible, otherwise compare as string
        const aValue = isNaN(aColText) ? aColText : Number(aColText);
        const bValue = isNaN(bColText) ? bColText : Number(bColText);

        return (aValue > bValue ? 1 : -1) * (sortDirection ? -1 : 1);
    });

    // Remove all existing rows from the table
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Append the sorted rows to the table
    tbody.append(...sortedRows);

    // Reverse the sort direction for the next sort
    sortDirection = !sortDirection;
}

// Add click event listeners to all th elements
const headers = document.querySelectorAll('th');
headers.forEach((header, index) => {
    if(index < headers.length - 1){
        header.addEventListener('click', () => {
            sortTable(index);
            document.querySelectorAll("th").forEach(th=> {
                th.classList.remove("sorted");
                th.innerHTML = th.innerHTML.replace(/ ▲| ▼/g, '');
            });
            header.classList.add("sorted");
            header.innerHTML += sortDirection ? ' ▼' : ' ▲';
        });
    }
});