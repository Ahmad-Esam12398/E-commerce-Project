import { originalOrders as initialOrders, originalOrders } from "./data.js";
import { products as initialProducts } from "./data.js";
import { orders as sellerOrders} from "./data.js";

if(JSON.parse(localStorage.getItem("Active User")) == null || JSON.parse(localStorage.getItem("Active User")).role != "Admin"){
    alert("You are not authorized to access this page.")
    window.location.href = "./home.html";
}  
if(localStorage.getItem("Orders") == null){
    localStorage.setItem("Orders", JSON.stringify(sellerOrders));
}

if(localStorage.getItem("products") == null){
    let plainProducts = initialProducts.map((item)=>item.getProduct());
    localStorage.setItem("products", JSON.stringify(plainProducts));
}

if(localStorage.getItem("originalOrders") == null){
localStorage.setItem("originalOrders", JSON.stringify(initialOrders));
}
// if(localStorage.getItem("products") == null){
// let plainProducts = originalProducts.map((item)=>item.getProduct());
// localStorage.setItem("products", JSON.stringify(plainProducts));
// }
let orders = JSON.parse(localStorage.getItem("originalOrders"));
let products = JSON.parse(localStorage.getItem("products"));
let _orders = JSON.parse(localStorage.getItem("Orders"));
console.log(orders);
function updateOriginalOrdersLocalStorage(){
    localStorage.setItem("originalOrders", JSON.stringify(orders));
}
function breakOrdersIntoProducts(ordersRow){
    //debugger;
    let target = [];
    let productsId = ordersRow["products"];
    let productsIndices = [];
    // debugger;
    for(let i = 0; i < productsId.length; i++){
        productsIndices.push(products.findIndex(product => product.id == productsId[i]));
    }
    // console.log(productsIndices);
    for(let i = 0; i < ordersRow["products"].length; i++){
        let result = {id: ordersRow["id"], product: products[productsIndices[i]], quantity: ordersRow["quantities"][i], date: ordersRow["date"], status: ordersRow["status"]}
        target.push(result);}
    return target;
}
function createTableOrders(){
    let myTable = document.getElementById("myTable");
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    // debugger;
    // console.log(breakOrdersIntoProducts(orders[0]));
    for(let i = 0; i < orders.length; i++){
        // debugger;
        let tableBody = document.getElementsByTagName("tbody")[0];
        let result = breakOrdersIntoProducts(orders[i]);
        //debugger;
        for(let j = 0; j < result.length; j++){
            let tableRow = document.createElement("tr");
            let id = result[j]["id"];
            let productName = result[j]["product"].name;
            let quantity = result[j]["quantity"];
            let date = result[j]["date"];
            let status = result[j]["status"];
            let customerId = orders[i]["customerId"];
            let unitPrice = result[j]["product"].price;
            let tableData = document.createElement("td");
            if(j == 0){
                tableData.innerHTML = id;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("table-secondary");
                tableRow.appendChild(tableData);
            }
            tableData = document.createElement("td");
            tableData.innerHTML = productName;
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            tableData.innerHTML = quantity;
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            tableData.innerHTML = unitPrice;
            tableRow.appendChild(tableData);
            let totalPrice = unitPrice * quantity;
            tableData = document.createElement("td");
            tableData.innerHTML = totalPrice;
            tableRow.appendChild(tableData);
            if(j == 0){
                let sum = 0;
                for(let k = 0; k < result.length; k++){
                    sum += result[k]["product"].price * result[k]["quantity"];
                }
                tableData = document.createElement("td");
                tableData.setAttribute("rowspan", result.length);
                tableData.innerHTML = sum;
                tableData.classList.add("table-secondary");
                tableRow.appendChild(tableData);

                tableData = document.createElement("td");
                tableData.innerHTML = date;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("table-secondary");
                tableRow.appendChild(tableData);
                tableData = document.createElement("td");
                tableData.innerHTML = customerId;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("table-secondary");
                tableRow.appendChild(tableData);
                tableData = document.createElement("td");
                tableData.innerHTML = status;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("fw-bold");
                tableData.classList.add("text-uppercase");
                if(status == "delivered"){
                    // tableData.classList.add("text-white");
                    tableData.classList.add("table-success");
                    tableRow.appendChild(tableData);
                    tableData = document.createElement("td");
                    let deleteButton = document.createElement("button");
                    deleteButton.classList.add("btn");
                    deleteButton.classList.add("btn-danger");
                    deleteButton.innerText = "Delete";
                    deleteButton.addEventListener("click", deleteOrder);
                    tableData.appendChild(deleteButton);
                    tableData.setAttribute("rowspan", result.length);
                }
                else if(status == "shipped"){
                    // tableData.classList.add("text-white");
                    tableData.classList.add("table-warning");
                    tableRow.appendChild(tableData);
                    tableData = document.createElement("td");
                    tableData.setAttribute("rowspan", result.length);
                    tableData.innerHTML = "N/A";
                }
                else{
                    // tableData.classList.add("text-white");
                    tableData.classList.add("table-danger");
                    tableRow.appendChild(tableData);
                    tableData = document.createElement("td");
                    tableData.setAttribute("rowspan", result.length);
                    tableData.innerHTML = "N/A";
                }
                tableRow.appendChild(tableData);
            }
            tableBody.appendChild(tableRow);
        }
        myTable.appendChild(tableBody);
    }
};
createTableOrders();



function deleteOrder(){
    if(confirm("Are You sure. Delete this Order!")){
        let tableRow = this.parentElement.parentElement;
        let rowSpan = tableRow.children[0].getAttribute("rowspan");
        let id = tableRow.children[0].innerHTML;
        let index = orders.findIndex(order => order.id == id);
        originalOrders.splice(index, 1);
        orders.splice(index, 1);
        updateOriginalOrdersLocalStorage();
        _orders.splice(index,1);
        localStorage.setItem("Orders",JSON.stringify(_orders))
        tableRow.parentElement.removeChild(tableRow);
        debugger;
        if(rowSpan){
            for(let i = 0; i < rowSpan - 1; i++){
                tableRow = tableRow.nextElementSibling;
                tableRow.parentElement.removeChild(tableRow);
            }

        }
        createTableOrders();
    }
}
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
        createTableOrders();
        document.getElementById("flexSwitchCheckPending").checked = true;
        document.getElementById("flexSwitchCheckShipped").checked = true;
        document.getElementById("flexSwitchCheckDelivered").checked = true;
        return;
    }
    // debugger;
    let allTableRows = [...document.querySelectorAll("tbody tr")];
    let tableRows = allTableRows.filter(tr => tr.classList.contains("d-none") == false); 
    tableRows.forEach(tr => tr.style.display = "");
    let rowSpan = 0;
    for(let i = 0; i < tableRows.length; i++){
        let flag = false;
        rowSpan = tableRows[i].children[0].getAttribute("rowspan");
        if(rowSpan){
            for(let j = i; j < i + +rowSpan; j++){
                for(let k = 0; k < tableRows[j].children.length - 1; k++){
                    if(tableRows[j].children[k].innerHTML.toLowerCase().indexOf(searchInput.toLowerCase()) != -1){
                        flag = true;
                        break;
                    }
                }
                if(flag){break;}
            }
            if(flag == false){
                for(let j = i; j < i + +rowSpan; j++){
                    tableRows[j].style.display = "none";
                }
            }
        }
        i += +rowSpan - 1;
    }
}
document.getElementById("flexSwitchCheckPending").addEventListener("click", function(){
    if(this.checked){
        filterTableChecked("pending");
    }
    else{
        filterTableUnChecked("pending");
    }
});
document.getElementById("flexSwitchCheckShipped").addEventListener("click", function(){
    if(this.checked){
        filterTableChecked("shipped");
    }
    else{
        filterTableUnChecked("shipped");
    }
});
document.getElementById("flexSwitchCheckDelivered").addEventListener("click", function(){
    if(this.checked){
        filterTableChecked("delivered");
    }
    else{
        filterTableUnChecked("delivered");
    }
});
function filterTableChecked(criteria){
    let tableRows = document.getElementsByTagName("tbody")[0].children;
    let rowSpan = 0;
    // debugger;
    for(let i = 0; i < tableRows.length; i++){
        rowSpan = tableRows[i].children[0].getAttribute("rowspan");
        if(rowSpan){
            let tableData = tableRows[i].children;
            if(tableData[8].innerHTML == criteria){
                for(let j = i; j < i + +rowSpan; j++){
                    tableRows[j].classList.remove("d-none");
                }
                i += +rowSpan - 1;
            }
        }
    }
}
function filterTableUnChecked(criteria){
    let tableRows = document.getElementsByTagName("tbody")[0].children;
    let rowSpan = 0;
    // debugger;
    for(let i = 0; i < tableRows.length; i++){
        rowSpan = tableRows[i].children[0].getAttribute("rowspan");
        if(rowSpan){
            let tableData = tableRows[i].children;
            if(tableData[8].innerHTML == criteria){
                for(let j = i; j < i + +rowSpan; j++){
                    tableRows[j].classList.add("d-none");
                }
                i += +rowSpan - 1;
            }
        }
    }
}