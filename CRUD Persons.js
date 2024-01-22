import { persons } from "./data.js";
import { Person } from "./person.js";
function createTablePersons(){
    let myTable = document.getElementById("myTable");
    let tableHead = document.getElementsByTagName("thead")[0];
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    let tableRow = document.createElement("tr");
    for(let key in persons[0].getPerson()){
        let tableHeadData = document.createElement("th");
        tableHeadData.innerHTML = key;
        tableRow.appendChild(tableHeadData);
    }
    let tableHeadData = document.createElement("th");
    tableHeadData.innerHTML = "Actions";
    tableRow.appendChild(tableHeadData);
    tableHead.appendChild(tableRow);
    myTable.appendChild(tableHead);
    for(let i = 0; i < persons.length; i++){
        tableRow = document.createElement("tr");
        for(let key in persons[i].getPerson()){

            let tableData = document.createElement("td");
            tableData.innerHTML = persons[i].getPerson()[key];
            tableRow.appendChild(tableData);
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
createTablePersons();
let operation = "";
function AddButton(){
    let lowerTable = document.getElementById("lowerTable");
    lowerTable.innerHTML = "";
    let addButton = document.createElement("i");
    addButton.innerHTML = "Add";
    addButton.className = "btn btn-outline-primary";
    addButton.setAttribute("data-bs-toggle", "modal");
    addButton.setAttribute("data-bs-target", "#staticBackdrop");
    addButton.addEventListener("click", function(){
        // console.log(document.forms[0]);
        document.forms[0].classList.remove("was-validated");
        operation = "add";
        let button = document.querySelectorAll("button[type='submit']")[0];
        // console.log(button);
        button.innerHTML = "Add";
        let inputs = document.querySelectorAll(".inputs");
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("is-valid");
            inputs[i].classList.remove("is-invalid");
        }
    });
    lowerTable.appendChild(addButton);
}
function validateForm() {
    // debugger;
    let name = document.getElementById("floatingName").value;
    let password = document.getElementById("floatingPassword").value;
    let address = document.getElementById("floatingAddress").value;
    let phone = document.getElementById("floatingPhone").value;
    let role = document.getElementById("PersonRole").value;
    let passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log(address.trim().length == 0);
    console.log(phone.trim().length < 11);
    console.log(role != "Seller" && role != "Admin" && role != "Guest");
    console.log(name.trim() == "");
    console.log(!passwordStrengthRegex.test(password));
    if(name.trim() == "" || password.length < 8 || address.trim().length == 0 || phone.trim().length < 11 || (role != "Seller" && role != "Admin" && role != "Guest")){
        alert("Please Input valid data");
        return false;
    }
    else{
        return true;
    }
}
function addPersonRow() {
    if(validateForm()){
        let name = document.getElementById("floatingName").value;
        let email = document.getElementById("floatingEmail").value;
        let password = document.getElementById("floatingPassword").value;
        let address = document.getElementById("floatingAddress").value;
        let phone = document.getElementById("floatingPhone").value;
        let role = document.getElementById("PersonRole").value;
        let newPerson = new Person(name, email, password, address, phone, role);
        persons.push(newPerson);
        createTablePersons();
    }
}
let id = -1;
function editRow(e) {
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
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("is-valid");
        inputs[i].classList.remove("is-invalid");
    }
    // console.log(products);
}

function saveNewRow() {
    if(validateForm()){
        if(confirm("Are you sure you want to save this Person?")) {
            let index = persons.findIndex(Person => Person.id == id);
            let rowChildrenValues = [];
            let inputs = document.querySelectorAll(".inputs");
            for(let i = 0; i < inputs.length; i++) {
                rowChildrenValues.push(inputs[i].value);
            }
            // console.log(rowChildrenValues);
            persons[index].setPerson(...rowChildrenValues);
            createTablePersons();
        }
    }
}
function deleteRow(e) {
    if(confirm("Are you sure you want to delete this product?")) {
        let row = e.target.parentElement.parentElement;
        let id = row.children[0].innerText;
        let index = persons.findIndex(product => product.id == id);
        // console.log(index);
        persons.splice(index, 1);
        createTablePersons();
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
            addPersonRow();
            operation = "";
        }
    }
    document.forms[0].classList.remove('was-validated');
    // console.log(event.target);
    let nameInput = document.getElementById("floatingName");
    let emailInput = document.getElementById("floatingEmail");
    let passwordInput = document.getElementById("floatingPassword");
    let addressInput = document.getElementById("floatingAddress");
    let phoneInput = document.getElementById("floatingPhone");
    let roleInput = document.getElementById("PersonRole");
    if(nameInput.value.trim().length < 2){
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
    }
    else{
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }
    if(emailInput.validity.valid){
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }
    else{
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
    }
    let passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(passwordStrengthRegex.test(passwordInput.value) == false){
        passwordInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-valid");
    }
    else{
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
    }
    if(addressInput.value.trim().length == 0){
        addressInput.classList.add("is-invalid");
        addressInput.classList.remove("is-valid");
    }
    else{
        addressInput.classList.remove("is-invalid");
        addressInput.classList.add("is-valid");
    }
    if(phoneInput.value.trim().length < 11){
        phoneInput.classList.add("is-invalid");
        phoneInput.classList.remove("is-valid");
    }
    else{
        phoneInput.classList.remove("is-invalid");
        phoneInput.classList.add("is-valid");
    }
    if(roleInput.value != "Seller" && roleInput.value != "Customer" && roleInput.value != "Admin" && roleInput.value != "Guest"){
        roleInput.classList.add("is-invalid");
        roleInput.classList.remove("is-valid");
    }
    else{
        roleInput.classList.remove("is-invalid");
        roleInput.classList.add("is-valid");
    }
});
// document.getElementById("floatingName").addEventListener("keydown", function(){
//     // console.log(this);
//     if(this.value.trim().length < 2){
//         this.classList.add("is-invalid");
//         this.classList.remove("is-valid");
//     }
//     else{
//         this.classList.remove("is-invalid");
//         this.classList.add("is-valid");
//     }
// });
// document.getElementById("floatingEmail").addEventListener("keydown", function(){
//     if(this.validity.valid){
//         this.classList.remove("is-invalid");
//         this.classList.add("is-valid");
//     }else{
//         this.classList.add("is-invalid");
//         this.classList.remove("is-valid");
//     }
// });
// document.getElementById("floatingPassword").addEventListener("keydown", function(){
//     // console.log(this);
//     let passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if(passwordStrengthRegex.test(this.value) == false){
//         this.classList.add("is-invalid");
//         this.classList.remove("is-valid");
//     }
//     else{
//         this.classList.remove("is-invalid");
//         this.classList.add("is-valid");
//     }
// });
// document.getElementById("floatingAddress").addEventListener("input", function(){
//     // console.log(this);
//     if(this.value.trim().length == 0){
//         this.classList.add("is-invalid");
//         this.classList.remove("is-valid");
//     }
//     else{
//         this.classList.remove("is-invalid");
//         this.classList.add("is-valid");
//     }
// });
// document.getElementById("floatingPhone").addEventListener("keydown", function(){
//     // console.log(this);
//     if(this.value.trim().length < 11){
//         this.classList.add("is-invalid");
//         this.classList.remove("is-valid");
//     }
//     else{
//         this.classList.remove("is-invalid");
//         this.classList.add("is-valid");
//     }
// });
// document.getElementById("PersonRole").addEventListener("input", function(){
//     // console.log(this);
//     if(this.value != "Seller" && this.value != "Customer" && this.value != "Admin" && this.value != "Guest"){
//         this.classList.add("is-invalid");
//         this.classList.remove("is-valid");
//     }
//     else{
//         this.classList.remove("is-invalid");
//         this.classList.add("is-valid");
//     }
// });
