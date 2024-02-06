import{OrderForSeller,GetSellerProduct} from "./function.js"
import{SideBarCollpse,ShowSideBar} from "./function.js"
// Authentications
if (JSON.parse(localStorage.getItem("Active User")).role != "Seller") {
    alert("You are not authorized to access this page.")
    window.location.href = "../home.html";
}

/*-----------------------------------------------------Get Poduct Statictics----------------------------------------------------------------------*/ 

let _orders=[]
let Prod_Stats = {
    No_Of_Product: GetSellerProduct().length,
    each_product_quantity: function () {
        let No_Of_Product = GetSellerProduct().length
        let arr = [];
        for (let i = 0; i < No_Of_Product; i++) {
            let obj = {
                productname: GetSellerProduct()[i].name,
                productQuantity: GetSellerProduct()[i].quantity
            }
            arr.push(obj)
        }
        return arr
    },
}

let modifiedProdStats = {
    No_Of_Product: Prod_Stats.No_Of_Product,
    productQuantityData: Prod_Stats.each_product_quantity(),
};
/*------------------------------------------------------------------orderStatics--------------------------------------------------------------------*/
if (localStorage.getItem("Orders") == null) {
    localStorage.setItem("Orders", JSON.stringify(orders));
    }
_orders = JSON.parse(localStorage.getItem("Orders"));
let modifiedOrder=OrderForSeller(_orders)
let orderedProduct = [];
let repeated = [];

for (let i = 0; i < modifiedOrder.length ; i++) {
    
    if (repeated.includes(modifiedOrder[i].productName)) {
        continue;
    }
    let quantity = parseInt(modifiedOrder[i].Quantity);
    for (let j = i+1; j < modifiedOrder.length; j++) {
        if (modifiedOrder[i].productName === modifiedOrder[j].productName) {
            quantity += parseInt(modifiedOrder[j].Quantity);
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

    GetSellerProduct().forEach(Product=>{
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



// localStorage.setItem('Prod_Stats', JSON.stringify(modifiedProdStats));

let Wallet=document.getElementsByClassName("wallet")[0]
let All_product=document.getElementsByClassName("allproduct")[0]
let TrendName=document.getElementsByClassName("TrendName")[0]
let TrendNumber=document.getElementsByClassName("TrendNumber")[0]
let LessDemandName=document.getElementsByClassName("lessorderName")[0]
let LessDemandNum=document.getElementsByClassName("lessorderNumber")[0]
let collapsed_button = document.getElementsByClassName("btn-collapse-sidebar")[0];
let btn_show_sidebar=document.getElementById("toggle-sidebar")


/* make collapsed button to narrow side bar and wide table*/
collapsed_button.addEventListener("click",SideBarCollpse );


/*make btn to show nav side bar in small screens */
btn_show_sidebar.addEventListener("click", ShowSideBar)



/*----------------------------------------------------------Get Object Product Statictics-------------------------------------------*/
// let Prod_Stats=JSON.parse(localStorage.getItem("Prod_Stats"))
let prod_name=modifiedProdStats.productQuantityData.map(item => item.productname)
let prod_quantity=modifiedProdStats.productQuantityData.map(item => item.productQuantity)
let prod_No=Prod_Stats.No_Of_Product
/*----------------------------------------------------------Get Object Order Statictics-------------------------------------------*/
//let OrderStat=JSON.parse(localStorage.getItem("OrderStat"))
let TrendPrdName=OrderStat.TrendOrder.Name
let TrendPrdQtn=OrderStat.TrendOrder.quantity
let DemandeOrder=OrderStat.MostOrderedProduct.quantity
let productName=OrderStat.MostOrderedProduct.productName
let Seller_Wallet=OrderStat.wallet
let LowDemand_Name=OrderStat.LessOrderDemand.productname
let LowDemand_No=OrderStat.LessOrderDemand.quantity
/*------------------------------------------------------Assign Card Content----------------------------------------------------------------- */
Wallet.innerHTML=Seller_Wallet+" EGP"
All_product.innerHTML=prod_No
TrendName.innerHTML=TrendPrdName
TrendNumber.innerHTML=TrendPrdQtn+" times"
LessDemandName.innerHTML=LowDemand_Name
LessDemandName.classList.add("small")
if(LowDemand_No==0){
    LessDemandNum.innerHTML="Not Order Yet"
}   
else{
    LessDemandNum.innerHTML=LowDemand_No
}
/*----------------------------------------------------Draw Charts-----------------------------------------------------------------------*/ 



var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: productName,
        datasets: [{
            label: 'Most Ordered Product',
            data: DemandeOrder,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(200, 159, 64, 1)',
                'rgba(150, 100, 210, 1)',
                'rgba(255, 120, 160, 1)',
                'rgba(120, 160, 105, 1)',
            ],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        height: 1000, 
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    }
});

var ctx = document.getElementById('myChart2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: prod_name,
        datasets: [{
            label: 'Product Quantity Chart',
            data: prod_quantity,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(200, 159, 64, 1)',
                'rgba(150, 100, 210, 1)',
                'rgba(255, 120, 160, 1)',
                'rgba(120, 160, 105, 1)',
            ],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: false,
                min: 0, // Set the minimum value for the x-axis
            },
            y: {
                beginAtZero: true,
            }
        },
        plugins: {},
    }
});





let Total_No_Order=OrderStat.NO_Order.Total
let Pending_NO=OrderStat.NO_Order.pending
let delivered_NO=OrderStat.NO_Order.delivered
let Shipped_NO=OrderStat.NO_Order.shipped

var ctx = document.getElementById('myChart3').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Pending Order","Deliver Order","Shipped Order"],
        datasets: [{
            label: 'Number of Order',
            data: [Pending_NO, delivered_NO, Shipped_NO],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Order Count (Total=${Total_No_Order})`,
                fontSize: 16,
            },
        },
    }
});