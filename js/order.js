
import { orders } from "./data.js"
import{OrderForSeller} from "./function.js"
import{SideBarCollpse,ShowSideBar} from "./function.js"
import { originalOrders } from "./data.js"
// Authentications
if (JSON.parse(localStorage.getItem("Active User")).role != "Seller") {
    alert("You are not authorized to access this page.")
    window.location.href = "./home.html";
}


let SwapSort=true
let _orders=[]
let collapsed_button = document.getElementsByClassName("btn-collapse-sidebar")[0];
let btn_show_sidebar=document.getElementById("toggle-sidebar")
if (localStorage.getItem("Orders") == null) {
    localStorage.setItem("Orders", JSON.stringify(orders));
    }
    _orders = JSON.parse(localStorage.getItem("Orders"));
    console.log(_orders)


    if (localStorage.getItem("originalOrders") == null) {
        localStorage.setItem("originalOrders", JSON.stringify(originalOrders));
        }
let _orders_=JSON.parse(localStorage.getItem("originalOrders"));
console.log(_orders_)

/* make collapsed button to narrow side bar and wide table*/
collapsed_button.addEventListener("click",SideBarCollpse );


/*make btn to show nav side bar in small screens */
btn_show_sidebar.addEventListener("click", ShowSideBar)

/*----------------------------------------------------------------draw Table for product---------------------------------------------------------------------*/ 

    function drawTable(_array, Parent) {
        console.log(Parent);
    Parent.innerHTML = "";
    if (_array === undefined || _array.length === 0) {
        _array = [];
        let NotFound = document.createElement("div");
        let text = "Orders";
        NotFound.innerHTML = "No" + ` ${text}`;
        Parent.appendChild(NotFound);
    } else {
        Parent.innerHTML = "";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
            drawHeaderRow(_array, thead, true,"productId","dateDeliver");
               // draw header of table
        Parent.appendChild(thead);
        for (let i = 0; i < _array.length; i++) {
            let row = document.createElement("tr");
            row.setAttribute("data-index",i+1)
                           // draw each Row of table
                drawRow(_array, i, row, true,"productId","dateDeliver"); 
            tbody.appendChild(row);
        }
        Parent.appendChild(tbody);
    }
}

    /*----------------------------------------------------------------draw Table Header for product---------------------------------------------------------------------*/ 
function drawHeaderRow(_array,RowParent,DrawOptionColumn,...excludeColumns){
    let modifiedHeader = Object.keys(_array[0]).filter(key => !excludeColumns.includes(key));
    RowParent.classList.add("table-light")
    let head_row = document.createElement("tr");
    if (DrawOptionColumn) {
        modifiedHeader.push("operation");
    }
    for (let i = 0; i < modifiedHeader.length; i++) {
        let head = document.createElement("th");
        let sortSpan=document.createElement("span")
        if(!(modifiedHeader[i]=="status"||modifiedHeader[i]=="customerName"||modifiedHeader[i]=="operation")){
        sortSpan.classList.add("sort")
        if(SwapSort){
            let sortUP=document.createElement("i")
            sortUP.classList.add("fa-solid","fa-sort-up","sort-up")
            sortUP.classList.toggle("d-inline-block");
            sortSpan.appendChild(sortUP)
        }
        else{
            let sortdown=document.createElement("i")
            sortdown.classList.add("fa-solid","fa-sort-down","sort-down")
            sortSpan.appendChild(sortdown) 
            }
        }
        head.innerHTML = modifiedHeader[i]
        head.appendChild(sortSpan)
        head.classList.add("text-center");
        head.classList.add("sticky-top")
        head_row.appendChild(head);
    }
    RowParent.appendChild(head_row);
        }

        /*-------------------------------------------------------------------draw Table Row for product-----------------------------------------------------------------------------------*/ 
        function drawRow(_array, RowIndex, RowParent, DrawOptionColumn, ...excludeColumns) {
            for (let key in _array[RowIndex]) {
                if (!excludeColumns.includes(key)) {
                    let cell = document.createElement("td");
                    if (key === "status" && _array[RowIndex][key] === "pending") {
                        cell.classList.add("text-danger");
                    } else if (key === "status" && _array[RowIndex][key] === "delivered") {
                        cell.classList.add("text-success");
                    } else if (key === "status" && _array[RowIndex][key] === "shipped") {
                        cell.classList.add("text-info");
                    }
                    
                    cell.innerHTML = _array[RowIndex][key];
                    cell.classList.add("text-center");
                    RowParent.appendChild(cell);
                }
            }
            if (DrawOptionColumn) {
                let cell = document.createElement("td");
                let createdSpan = document.createElement("span");
                createdSpan.classList.add("text-center");
                if (_array[RowIndex]["status"] === "pending") {
                    let shipped = document.createElement("i");
                    shipped.classList.add("fa-solid", "fa-truck", "px-2", "text-center", "w-50");
                    createdSpan.appendChild(shipped);
                }
                else if (_array[RowIndex]["status"] === "pending" || _array[RowIndex]["status"] === "shipped") {
                    let delivered = document.createElement("i");
                    delivered.classList.add("fa-solid", "fa-circle-check", "px-2", "text-center");
                    createdSpan.appendChild(delivered);
                }
                else if(_array[RowIndex]["status"]=="delivered"){
                    createdSpan.innerHTML="done"
                    createdSpan.classList.add("text-success","text-center")
                }
                let moreDetails = document.createElement("i");
                moreDetails.classList.add("fa-solid", "fa-eye", "px-2", "text-center", "w-50");
                createdSpan.appendChild(moreDetails)
                cell.appendChild(createdSpan);
                RowParent.appendChild(cell);
            }
        }
        let SelectedTable=document.getElementById("order-table")

//  /*------ --------------------------------------------render Table -----------------------------------------------------------------------------*/

    // Call your drawTable function here
    document.addEventListener("DOMContentLoaded",function(){
        drawTable(OrderForSeller(_orders), SelectedTable); })
//   /*------------------------------------- - --------------------------------------------------------------------------------------------------------*/

let TableIcon=document.getElementsByClassName("floatingTable")[0]
SelectedTable.addEventListener("click", function (e) {
    let PendingOrder = OrderForSeller(_orders).filter(item => item.status == "pending");
    if (e.target.classList.contains("sort-up") || e.target.classList.contains("sort-down")) {
        TableIcon.style.display = "inline-block";
        let keyElement = e.target.parentNode.parentNode; 
        let key = keyElement.textContent.trim(); 
        if(key=="dateOrder"||key=="dateDeliver"){
            PendingOrder.sort(function (x, y) {
                let dateX = new Date(x.dateOrder);
                let dateY = new Date(y.dateOrder);
                if (SwapSort) {
                    return dateX - dateY;
                } else {
                    return dateY - dateX;
                }
            });         
        }
        PendingOrder.sort(function (x, y) {
                console.log(key)
                if(typeof(x[key])=="string"){
                    if (SwapSort) {
                        return x[key].localeCompare(y[key]);
                    } else {
                        return y[key].localeCompare(x[key]);
                    }
                }
                else{
                    if (SwapSort) {
                        return x[key] - y[key];
                    } else {
                        return y[key] - x[key];
                    }
                }
                });
        
        SwapSort = !SwapSort;  
        drawTable(PendingOrder, SelectedTable, true);
    }
});
TableIcon.addEventListener("click",function(){
    drawTable(OrderForSeller(_orders), SelectedTable, true);
    TableIcon.style.display="none"
})

/*----------------------------------------------------------Actions----------------------------------------------------------------*/
SelectedTable.addEventListener("click",function(e){
    if(e.target.classList.contains("fa-truck")){
        let CurrentID = e.target.parentNode.parentNode.parentNode.firstChild.innerHTML;
        console.log(CurrentID)
        let CurrentOrder=_orders.find(order=>order.orderId==CurrentID)
        CurrentOrder.status="shipped"
        localStorage.setItem("Orders",JSON.stringify(_orders))
        console.log(_orders_)
        let currentorder=_orders_.find(order=>order.id==CurrentID)
        console.log(currentorder)
        currentorder.status="shipped"
        localStorage.setItem("originalOrders",JSON.stringify(_orders_))
        let modifiedOrder=OrderForSeller(_orders)
        drawTable(modifiedOrder,SelectedTable);
        //console.log(_orders)
    }   

})

SelectedTable.addEventListener("click",function(e){
    if(e.target.classList.contains("fa-circle-check")){
        let CurrentID = e.target.parentNode.parentNode.parentNode.firstChild.innerHTML;
        console.log(CurrentID)
        let CurrentOrder=_orders.find(order=>order.orderId==CurrentID)
        console.log(CurrentOrder)
        CurrentOrder.status="delivered"
        localStorage.setItem("Orders",JSON.stringify(_orders))
        let currentorder=_orders_.find(order=>order.id==CurrentID)
        currentorder.status="delivered"
        localStorage.setItem("originalOrders",JSON.stringify(_orders_))
        let modifiedOrder=OrderForSeller(_orders)
        drawTable(modifiedOrder,SelectedTable);
        //console.log(_orders)
    }   

})

SelectedTable.addEventListener("click",function(e){
    if(e.target.classList.contains("fa-eye")){
        let CurrentRowIndex = parseInt(e.target.parentNode.parentNode.parentNode.getAttribute("data-index"))-1;
        let modifiedOrder=OrderForSeller(_orders)
        let CurrentElement=modifiedOrder[CurrentRowIndex]
        console.log(CurrentElement)
        $('#form').modal('show')
        document.getElementById("orderId").value=CurrentElement.OrderID
        document.getElementById("productName").value=CurrentElement.productName
        document.getElementById("quantityOrdered").value=CurrentElement.QuantityOrdered
        document.getElementById("status").value= CurrentElement.status
        document.getElementById("dateOrder").value= CurrentElement.dateOrder
        document.getElementById("dateDeliver").value= CurrentElement.dateDeliver
        document.getElementById("customerName").value= CurrentElement.customerName
        document.getElementById("totalPrice").value= CurrentElement.TotalPrice
        //console.log(_orders)
    }   

})

/*-----------------------------------------------------------Search---------------------------------------------------- */
let SearchedProduct = document.getElementsByClassName("search-input")[0]
SearchedProduct.addEventListener("keyup", function () {
    let modifiedOrder=OrderForSeller(_orders)
    let inputValue = SearchedProduct.value.toLowerCase();
    let filterProduct = [];
    if (inputValue.trim() !== "") {
        filterProduct = modifiedOrder.filter(function (item) {
            if (item.productName.toLowerCase().includes(inputValue) || item.status.toLowerCase().includes(inputValue)) {
                return item;
            }
        });
    }
    else {
        filterProduct = modifiedOrder
    }
    console.log(filterProduct)
    drawTable(filterProduct, SelectedTable, true);
});

/*-----------------------------------------------------------Statistics---------------------------------------------------- */
// let modifiedOrder=OrderForSeller(_orders)
// let orderedProduct = [];
// let repeated = [];

// for (let i = 0; i < modifiedOrder.length ; i++) {
    
//     if (repeated.includes(modifiedOrder[i].productName)) {
//         continue;
//     }
//     let quantity = parseInt(modifiedOrder[i].QuantityOrdered);
//     for (let j = i+1; j < modifiedOrder.length; j++) {
//         if (modifiedOrder[i].productName === modifiedOrder[j].productName) {
//             quantity += parseInt(modifiedOrder[j].QuantityOrdered);
//         }
//     }
//     orderedProduct.push({ productName: modifiedOrder[i].productName, quantity });
//     repeated.push(modifiedOrder[i].productName);
// }

// console.log(orderedProduct)
// let SellerWallet=modifiedOrder.filter(order=>order.status=="delivered")
//                               .reduce((total, order) => total + order.TotalPrice-50,0)   //assume 50$ for each poduct for expense(transport+paltfrom fee)
                    
//     let LessOrder=[]
//     let found=false

//     SellerProduct.forEach(Product=>{
//         if(!(orderedProduct.map(item=>item.productName).includes(Product.name))){
//             found=true
//             LessOrder.push({productname:Product.name,
//                                     quantity:0})
//                                     return;
//         }})
//         if(!found){
//             LessOrder.push({
//                 productname:orderedProduct.find(item=>item.quantity==Math.min(...orderedProduct.map(order=>order.quantity))).productName,
//                 quantity:Math.min(...orderedProduct.map(order=>order.quantity))
//             })
//         }
//     let OrderStat={
//         TrendOrder:{
//             quantity:Math.max(...orderedProduct.map(order=>order.quantity)),
//             Name:orderedProduct.find(item=>item.quantity==Math.max(...orderedProduct.map(order=>order.quantity))).productName
//             },
//         MostOrderedProduct:{
//             productName:orderedProduct.map(item=>item.productName),
//             quantity:orderedProduct.map(item=>item.quantity)
//         },
//         wallet:SellerWallet,
//         NO_Order:{
//             Total:modifiedOrder.length,
//             pending:modifiedOrder.filter((item=>item.status=="pending")).length,
//             delivered:modifiedOrder.filter((item=>item.status=="delivered")).length,
//             shipped:modifiedOrder.filter((item=>item.status=="shipped")).length,
//             },
//             LessOrderDemand:{
//                 productname:LessOrder.map(item=>item.productname)[0],
//                 quantity:LessOrder.map(item=>item.quantity)[0]
//             }
//         }

//             console.log(LessOrder.map(item=>item.productname))

// localStorage.setItem("OrderStat",JSON.stringify(OrderStat))

export { OrderForSeller};

