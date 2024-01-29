

import { originalOrders as orders } from "./data.js";
let me = JSON.parse(localStorage.getItem("Active User"))
console.log(me.id);
let myOrders = orders;
console.log(myOrders);
// myOrders.filter((order)=> order["id"] ==)
export function createTableOrders(myID){
    let myTable = document.getElementById("myTable");
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    // debugger;
    // console.log(breakOrdersIntoProducts(orders[0]));
    for(let i = 0; i < orders.length; i++){
        let tableBody = document.getElementsByTagName("tbody")[0];
        let result = breakOrdersIntoProducts(orders[i]);
        // debugger;
        for(let j = 0; j < result.length; j++){
            let tableRow = document.createElement("tr");
            let id = result[j]["id"];
            let productName = result[j]["product"].name;
            let quantity = result[j]["quantity"];
            let date = result[j]["date"].toLocaleDateString();
            let status = result[j]["status"];
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
            }
            if(j == 0){
                tableData = document.createElement("td");
                tableData.innerHTML = date;
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
                }
                else if(status == "shipped"){
                    // tableData.classList.add("text-white");
                    tableData.classList.add("table-warning");
                }
                else{
                    // tableData.classList.add("text-white");
                    tableData.classList.add("table-danger");
                }
                tableRow.appendChild(tableData);
            }
            tableBody.appendChild(tableRow);
        }
        myTable.appendChild(tableBody);
    }
};
function breakOrdersIntoProducts(ordersRow){
    let target = [];
    for(let i = 0; i < ordersRow["products"].length; i++){
        let result = {id: ordersRow["id"], product: ordersRow["products"][i], quantity: ordersRow["quantities"][i], date: ordersRow["date"], status: ordersRow["status"]}
        target.push(result);}
    return target;
}
