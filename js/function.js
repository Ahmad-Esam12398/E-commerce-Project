
import { Person } from "./person.js";
import { products as originalProducts, persons as originalPersons } from "./data.js";
import { Product } from "./productsmodule.js"
import { orders } from "./data.js"
// Authentications
if (JSON.parse(localStorage.getItem("Active User")).role != "Seller") {
    alert("You are not authorized to access this page.")
    window.location.href = "../home.html";
}

if (localStorage.getItem("Persons") == null) {
    let plainPersons = originalPersons.map((item) => item.getPerson());
    localStorage.setItem("Persons", JSON.stringify(plainPersons));
}
if (localStorage.getItem("products") == null) {
    let plainProducts = originalProducts.map((item) => item.getProduct());
    localStorage.setItem("products", JSON.stringify(plainProducts));
}


let persons=JSON.parse(localStorage.getItem("Persons"))
let products=JSON.parse(localStorage.getItem("products"))
let side_bar = document.getElementById("sidebar");
let content = document.getElementById("content");


function OrderForSeller(_array){
    let separatedOrders = [];
    let OrderPerSeller = [];
    _array.forEach(order => {
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
let SellerProduct=GetSellerProduct()
separatedOrders.forEach(order => {
    SellerProduct.forEach(product => {
        if (order.productId == product.id) {
            OrderPerSeller.push(order);
        }
    });
});
let modifiedOrder = [];
OrderPerSeller.forEach(order => {
    let individualOrder = {
        OrderID: order.OrderID,
        productId:order.productId,
        productName:  order.productName,
        Quantity: order.productQuantity,
        dateOrder: order.dateOrder.toLocaleDateString(),
        dateDeliver: order.dateDeliver.toLocaleDateString(),
        status: order.status,
        customerName: persons.find(person => person.id == order.customerId).name,
        TotalPrice:order.productQuantity*(products.find(product=>product.id==order.productId).price)
    };
    modifiedOrder.push(individualOrder);
});
return modifiedOrder
}

function GetSellerProduct(){
    let SellerProducts=[]
    let products=JSON.parse(localStorage.getItem("products"))
    let activeUser = JSON.parse(localStorage.getItem("Active User"))
    let SellerId = activeUser.id
    SellerProducts = products.filter(item => item.sellerID == SellerId)
    return SellerProducts
}


function SideBarCollpse() {
    side_bar.classList.toggle("active");
    side_bar.classList.toggle("col-lg-1");
    side_bar.classList.toggle("col-lg-2");
    content.classList.toggle("col-lg-10");
    content.classList.toggle("col-lg-11");
}

function ShowSideBar() {
    side_bar.classList.toggle("show-nav");
    side_bar.classList.remove("col-lg-2");
    side_bar.classList.add("fixed-width");
    content.classList.toggle("col-lg-10");
}
export {OrderForSeller,GetSellerProduct,SideBarCollpse,ShowSideBar}