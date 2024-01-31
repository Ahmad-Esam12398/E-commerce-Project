// Authentications
if (JSON.parse(localStorage.getItem("Active User")).role != "Seller") {
    alert("You are not authorized to access this page.")
    window.location.href = "./home.html";
}

let SwapSort=true
let OrderPerSeller=[]
let SellerProduct=[]
let activeUser=JSON.parse(localStorage.getItem("activeuser"))
let collapsed_button = document.getElementsByClassName("btn-collapse-sidebar")[0];
let btn_show_sidebar=document.getElementById("toggle-sidebar")
let side_bar = document.getElementById("sidebar");
let products=JSON.parse(localStorage.getItem("products"))
let persons=JSON.parse(localStorage.getItem("Persons"))

if (localStorage.getItem("Orders") == null) {
    localStorage.setItem("Orders", JSON.stringify(orders));
    }

    let _orders = JSON.parse(localStorage.getItem("Orders"));
/* make collapsed button to narrow side bar and wide table*/


collapsed_button.addEventListener("click", function () {
    side_bar.classList.toggle("active");
    side_bar.classList.toggle("col-lg-1");
    side_bar.classList.toggle("col-lg-2");
    content.classList.toggle("col-lg-10");
    content.classList.toggle("col-lg-11");
    });
    
    /*make btn to show nav side bar in small screens */
    btn_show_sidebar.addEventListener("click",function(){
    side_bar.classList.toggle("show-nav");
    side_bar.classList.remove("col-lg-2");
    side_bar.classList.add("fixed-width");
    content.classList.toggle("col-lg-10");
    })
    console.log(_orders)




    let separatedOrders = [];
    
    /*---------------------------------------------map order Array to each seller---------------*/
    _orders.forEach(order => {
        order. _products_.forEach(product => {
            let individualOrder = {
                OrderID:order.orderId,
                productId: product.id,
                productName: product.name,
                productQuantity: product.quantity,
                dateOrder: new Date(order. Order_date),
                dateDeliver: new Date(order.Delivered_date),
                status: order.status,
                customerId: order.customerId
            };
            separatedOrders.push(individualOrder);
        });
    });
console.log(separatedOrders)

function GetSellerProduct() {   
    let SellerId = activeUser.id        //get Seller Product 
    let SellerProducts = products.filter(item => item.sellerID == SellerId)
    return SellerProducts
}
SellerProduct=GetSellerProduct()
console.log(SellerProduct)

separatedOrders.forEach(order => {
    SellerProduct.forEach(product => {
        if (order.productId == product.id) {
            OrderPerSeller.push(order);
        }
    });
});
console.log(OrderPerSeller)
let modifiedOrder = [];

OrderPerSeller.forEach(order => {
    let individualOrder = {
        OrderID: order.OrderID,
        productName:  order.productName,
        QuantityOrdered: order.productQuantity,
        dateOrder: order.dateOrder.toLocaleDateString(),
        dateDeliver: order.dateDeliver.toLocaleDateString(),
        status: order.status,
        customerName: persons.find(person => person.id == order.customerId).name,
        TotalPrice:order.productQuantity*(products.find(product=>product.id==order.productId).price)
    };
    modifiedOrder.push(individualOrder);
});

console.log(modifiedOrder);
/*----------------------------------------------------------------draw Table for product---------------------------------------------------------------------*/ 
function drawTable(_array, Parent) {
    Parent.innerHTML = "";
    if (_array === undefined || _array.length === 0) {
        _array = [];
        let NotFound = document.createElement("div");
        let text = "products";
        NotFound.innerHTML = "No" + ` ${text}`;
        Parent.appendChild(NotFound);
    } else {
        Parent.innerHTML = "";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        drawHeaderRow(_array, thead, false,"productId" );        // draw header of table
        Parent.appendChild(thead);
        for (let i = 0; i < _array.length; i++) {
            let row = document.createElement("tr");
            drawRow(_array, i, row, false,"productId");             // draw each Row of table
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
        if(!(modifiedHeader[i]=="status"||modifiedHeader[i]=="customerName")){
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
                    }
                    else if(key === "status" && _array[RowIndex][key] === "delivered"){
                        cell.classList.add("text-success");
                    }
                    else if(key === "status" && _array[RowIndex][key] === "shipped"){
                        cell.classList.add("text-info");
                    }
        
                    if (typeof _array[RowIndex][key] === "string" && _array[RowIndex][key].includes("image")) {
                        cell.classList.add("img-center", "position-relative");
                        let Createdimg = document.createElement("img");
                        let source = _array[RowIndex][key];
                        Createdimg.src = source;
                        Createdimg.classList.add("center-img");
                        cell.appendChild(Createdimg);
                    } else {
                        cell.innerHTML = _array[RowIndex][key];
                        cell.classList.add("text-center");
                    }
                    RowParent.appendChild(cell);
                }
            }
        
            if (DrawOptionColumn) {
                let cell = document.createElement("td");
                let createdSpan = document.createElement("span");
                createdSpan.classList.add("text-center");
                let update = document.createElement("i");
                update.classList.add("fa-solid", "fa-pen", "px-2", "text-center", "w-50");
                let Delete = document.createElement("i");
                Delete.classList.add("fa-solid", "fa-trash", "px-2", "text-center");
                createdSpan.appendChild(update);
                createdSpan.appendChild(Delete);
                cell.appendChild(createdSpan);
                RowParent.appendChild(cell);
            }
        }
        let SelectedTable=document.getElementById("order-table")

//  /*------ --------------------------------------------render Table -----------------------------------------------------------------------------*/
                                                    drawTable(modifiedOrder,SelectedTable,false);
//   /*------------------------------------- - --------------------------------------------------------------------------------------------------------*/


let TableIcon=document.getElementsByClassName("floatingTable")[0]
SelectedTable.addEventListener("click", function (e) {
    let PendingOrder = modifiedOrder.filter(item => item.status == "pending");
    
    if (e.target.classList.contains("sort-up") || e.target.classList.contains("sort-down")) {
        TableIcon.style.display = "inline-block";
        let keyElement = e.target.parentNode.parentNode; 
        let key = keyElement.textContent.trim(); 
        if(key=="dateOrder"){
            modifiedOrder.sort(function (x, y) {
                let dateX = new Date(x.dateOrder);
                let dateY = new Date(y.dateOrder);
            
                if (SwapSort) {
                    return dateX - dateY;
                } else {
                    return dateY - dateX;
                }
            });         
        }
        
            modifiedOrder.sort(function (x, y) {
                console.log(key)
                if (SwapSort) {
                    
                    return x[key] - y[key];
                } else {
                    return y[key] - x[key];
                }
            });
        
        SwapSort = !SwapSort;  
        drawTable(PendingOrder, SelectedTable, true);
    }
});
TableIcon.addEventListener("click",function(){
    drawTable(modifiedOrder, SelectedTable, true);
    TableIcon.style.display="none"
})
/*-----------------------------------------------------------Entry---------------------------------------------------- */
let SelectedEntry=document.getElementById("entry")
                SelectedEntry.addEventListener("change", ShowEntry)
                function ShowEntry () {
                    let size=0
                    if(SelectedEntry.value=="Full"){
                        size=modifiedOrder.length
                    }
                    else{
                        size = parseInt(SelectedEntry.value)
                    }
                    let ShownArrayEntry = []
                    for (let i = 0; i < size; i++) {
                        ShownArrayEntry.push( modifiedOrder[i]);
                    }
                    drawTable(ShownArrayEntry, SelectedTable, true);
            
                }
/*-----------------------------------------------------------Search---------------------------------------------------- */
let SearchedProduct = document.getElementsByClassName("search-input")[0]
SearchedProduct.addEventListener("keyup", function () {
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
let orderedProduct = [];
let repeated = [];

for (let i = 0; i < modifiedOrder.length ; i++) {
    
    if (repeated.includes(modifiedOrder[i].productName)) {
        continue;
    }
    let quantity = parseInt(modifiedOrder[i].QuantityOrdered);
    for (let j = i+1; j < modifiedOrder.length; j++) {
        if (modifiedOrder[i].productName === modifiedOrder[j].productName) {
            quantity += parseInt(modifiedOrder[j].QuantityOrdered);
        }
    }
    orderedProduct.push({ productName: modifiedOrder[i].productName, quantity });
    repeated.push(modifiedOrder[i].productName);
}

console.log(orderedProduct)
let SellerWallet=modifiedOrder.filter(order=>order.status=="delivered")
                              .reduce((total, order) => total + order.TotalPrice-50,0)   //assume 50$ for each poduct for expense(transport+paltfrom fee)
                    
    let LessOrder=[]
    let found=false

    SellerProduct.forEach(Product=>{
        if(!(orderedProduct.map(item=>item.productName).includes(Product.name))){
            found=true
            LessOrder.push({productname:Product.name,
                                    quantity:0})
                                    return;
        }})
        if(!found){
            LessOrder.push({
                productname:orderedProduct.find(item=>item.quantity==Math.min(...orderedProduct.map(order=>order.quantity))).productName,
                quantity:Math.min(...orderedProduct.map(order=>order.quantity))
            })
        }

    let OrderStat={
        TrendOrder:{
            quantity:Math.max(...orderedProduct.map(order=>order.quantity)),
            Name:orderedProduct.find(item=>item.quantity==Math.max(...orderedProduct.map(order=>order.quantity))).productName
            },
        MostOrderedProduct:{
            productName:orderedProduct.map(item=>item.productName),
            quantity:orderedProduct.map(item=>item.quantity)
        },
        wallet:SellerWallet,
        NO_Order:{
            Total:modifiedOrder.length,
            pending:modifiedOrder.filter((item=>item.status=="pending")).length,
            delivered:modifiedOrder.filter((item=>item.status=="delivered")).length,
            shipped:modifiedOrder.filter((item=>item.status=="shipped")).length,
            },
            LessOrderDemand:{
                productname:LessOrder.map(item=>item.productname)[0],
                quantity:LessOrder.map(item=>item.quantity)[0]
            }
        }

            console.log(LessOrder.map(item=>item.productname))

localStorage.setItem("OrderStat",JSON.stringify(OrderStat))
