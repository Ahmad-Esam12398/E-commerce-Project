
import { Person } from "./person.js";
import { products as originalProducts, persons as originalPersons } from "./data.js";
import { Product } from "./productsmodule.js"
import{SideBarCollpse,ShowSideBar,GetSellerProduct} from "./function.js"
import { orders } from "./data.js"
// Authentications
if (JSON.parse(localStorage.getItem("Active User")).role != "Seller") {
    alert("You are not authorized to access this page.")
    window.location.href = "./home.html";
}

if (localStorage.getItem("Persons") == null) {
    let plainPersons = originalPersons.map((item) => item.getPerson());
    localStorage.setItem("Persons", JSON.stringify(plainPersons));
}
if (localStorage.getItem("products") == null) {
    let plainProducts = originalProducts.map((item) => item.getProduct());
    localStorage.setItem("products", JSON.stringify(plainProducts));
}
if (localStorage.getItem("Orders") == null) {
    localStorage.setItem("Orders", JSON.stringify(orders));
}


let persons = JSON.parse(localStorage.getItem("Persons"));

let products = JSON.parse(localStorage.getItem("products"));

let _orders=JSON.parse(localStorage.getItem("Orders"))

let IsEdit = false
let CurrentIndex = 0
let SellerProduct = []
let SwapSort = true
let collapsed_button = document.getElementsByClassName("btn-collapse-sidebar")[0];
let btn_show_sidebar = document.getElementById("toggle-sidebar")
let stbBtn = document.querySelector("input[type='submit']")
let ProductName = document.getElementById("floatingname")
let ProductPrice = document.getElementById("floatingprice")
let ProductQuantity = document.getElementById("floatingQuantity")
let ProductCatagory = document.getElementById("floatingcatagory")
let ProductDescription = document.getElementById("floatingdescription")
let ProductImage = document.getElementById("floatingImage")
let CloseButton = document.getElementById("close")
let CloseIcon = document.getElementsByClassName("btn-close")[0]
let DeleteBtn = document.getElementById("delete")
let SearchedProduct = document.getElementsByClassName("search-input")[0];
let CreateBtn = document.getElementById("create")
let SelectedTable = document.getElementById("product")




/*change value of modal when Add new product*/
CreateBtn.addEventListener("click", function () {
    IsEdit = false
    stbBtn.value = "Add"
})


/* make collapsed button to narrow side bar and wide table*/
collapsed_button.addEventListener("click",SideBarCollpse );


/*make btn to show nav side bar in small screens */
btn_show_sidebar.addEventListener("click", ShowSideBar)


/*---------------------------------------------Get Seller Product to show in table--------------------------------------------------------*/

/*get seller information from persons*/
let activeUser = JSON.parse(localStorage.getItem("Active User"))

localStorage.setItem("activeuser", JSON.stringify(activeUser));

/*get seller product it will return whole array of product*/

SellerProduct = GetSellerProduct()

/*---------------------------------------------------------draw table for product------------------------------------------------------------*/
/*draw Whole Table for product*/
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
        drawHeaderRow(_array, thead, true, "description", "sellerID", "categoryPath", "otherCategory");        // draw header of table
        Parent.appendChild(thead);
        
        for (let i = 0; i < _array.length; i++) {
            let row = document.createElement("tr");
            
            drawRow(_array, i, row, true, "description", "sellerID", "categoryPath", "otherCategory");             // draw each Row of table
            tbody.appendChild(row);
        }
        Parent.appendChild(tbody);
    }
}

/*draw Table Header for product*/
function drawHeaderRow(_array, RowParent, DrawOptionColumn, ...excludeColumns) {
    let modifiedHeader = Object.keys(_array[0]).filter(key => !excludeColumns.includes(key));
    RowParent.classList.add("table-light")
    let head_row = document.createElement("tr");
    if (DrawOptionColumn) {
        modifiedHeader.push("Action");
    }
    for (let i = 0; i < modifiedHeader.length; i++) {
        let head = document.createElement("th");
        let sortSpan = document.createElement("span")
        if (!(modifiedHeader[i] == "image" || modifiedHeader[i] == "Action")) {
            sortSpan.classList.add("sort")
            if (SwapSort) {
                let sortUP = document.createElement("i")
                sortUP.classList.add("fa-solid", "fa-sort-up", "sort-up")
                sortUP.classList.toggle("d-inline-block");
                sortSpan.appendChild(sortUP)
            }
            else {
                let sortdown = document.createElement("i")
                sortdown.classList.add("fa-solid", "fa-sort-down", "sort-down")
                sortSpan.appendChild(sortdown)
            }
        }
        head.innerHTML = modifiedHeader[i]
        head.appendChild(sortSpan)
        head.classList.add("text-center");
        head_row.appendChild(head);
        head.classList.add("sticky-top")
    }
    RowParent.appendChild(head_row);
}

/*-------------------------------------draw Table Row for product-------------------------------------------------------------*/
function drawRow(_array, RowIndex, RowParent, DrawOptionColumn, ...excludeColumns) {
    let counter=0;
    for (let key in _array[RowIndex]) {
        
        if (!excludeColumns.includes(key)) {
            let cell = document.createElement("td");
            if (counter==4) {
                console.log(counter)
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
            counter++;
        }
    }
    if (DrawOptionColumn) {
        let cell = document.createElement("td");
        let createdSpan = document.createElement("span");
        createdSpan.classList.add("text-center");
        let moreDetails = document.createElement("i");
        moreDetails.classList.add("fa-solid", "fa-eye", "px-2", "text-center", "w-50","d-sm-none");
        createdSpan.appendChild(moreDetails)
        let update = document.createElement("i");
        update.classList.add("fa-solid", "fa-pen", "px-2", "text-center", "w-50","d-block","py-1","d-sm-inline-block");
        let Delete = document.createElement("i");
        Delete.classList.add("fa-solid", "fa-trash", "px-2", "text-center");
        createdSpan.appendChild(update);
        createdSpan.appendChild(Delete);
        cell.appendChild(createdSpan);
        RowParent.appendChild(cell);
    }
}

//  /*------ --------------------------------------------render Table -----------------------------------------------------*/
document.addEventListener("DOMContentLoaded",function(){
drawTable(SellerProduct, SelectedTable);})
//   /*--------------------------------------------------------------------------------------------------------------------*/


/* -----------------------------------------------make crud operation on product(Create-Update-Delete)---------------------------*/

/*------------------Toggle between Create and Update---------- */
stbBtn.addEventListener("click", function (event) {                    //here create
    let OutOfForum = false;
    if (!IsEdit) {
        if (validatename(ProductName.value, ProductName) ||
            validatePrice(ProductPrice.value, ProductPrice) ||
            validateQuantity(ProductQuantity.value, ProductQuantity) ||
            validatecatgory(ProductCatagory)||
            validateImagePath(ProductImage.value,ProductImage)||
            validatDescription(ProductDescription.value, ProductDescription)
            )
            {
            event.preventDefault();
        } else {
            let createobj = new Product(0,
                "DefaultName",
                0,
                0,
                "DefaultDescription",
                "DefaultImage",
                0,
                "DefaultCategory"
            );
            createobj.id=products[products.length-1].id+1
            SetProduct(createobj);
            console.log(products)
            products.push(createobj.getProduct());
            OutOfForum = true;
        }
        if (OutOfForum) {
            deleteInput(form);
            localStorage.setItem('products', JSON.stringify(products));
            drawTable(GetSellerProduct(), SelectedTable, true);
            $('#form').modal('hide');
        }
    } else {                                                        //here Update
        if (validatename(ProductName.value, ProductName) ||
            validatePrice(ProductPrice.value, ProductPrice) ||
            validateQuantity(ProductQuantity.value, ProductQuantity) ||
            (ProductCatagory.value===""||ProductCatagory.value=="Other")||
            validatDescription(ProductDescription.value, ProductDescription) ||
            validateImagePath(ProductImage.value, ProductImage)
        ) {
            event.preventDefault();
        } else {
            SetProduct(products[CurrentIndex]);
            notifaction("updated", products[CurrentIndex].name);
            localStorage.setItem('products', JSON.stringify(products));
            drawTable(GetSellerProduct(), SelectedTable, true);
            $('#form').modal('hide');
            deleteInput(ProductName, ProductCatagory, ProductPrice, ProductDescription, ProductQuantity);
            deleteInput(form);
            IsEdit = false;
        }
    }
});
/*----------------------------------------Make Validition-----------------------------------------------------------------*/
function SetProduct(pro) {
    pro.name = document.getElementById("floatingname").value;
    pro.category = document.getElementById("floatingcatagory").value
    pro.price = document.getElementById("floatingprice").value;
    pro.quantity = document.getElementById("floatingQuantity").value;
    pro.description = document.getElementById("floatingdescription").value;
    pro.image = document.getElementById("floatingImage").value;
    pro.sellerID = activeUser.id;
}

function validatename(_name, input) {
    let name = /^[A-Za-z\s]{3,}$/;
    if (_name.match(name)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return false;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return true;
    }
}

function validatecatgory(input) {
    if(input.value===""||input.value=="Other") {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return true;
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return false;
    }
}

function validatDescription(_name, input) {
    let descriptionPattern = /^[a-zA-Z0-9\s,\.!]+$/;
    if (_name.match(descriptionPattern)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return false;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return true;
    }
}

function validatePrice(_num, input) {
    let num = parseInt(_num.trim())
    if (num > 0 && num < 1000000) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return false;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return true;
    }
}

function validateQuantity(_num, input) {
    let num = parseInt(_num.trim());
    if (num > 0 && num < 5000) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return false;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return true;
    }
}


function validateImagePath(text, input) {
    let descriptionPattern = ".*\.[a-zA-Z]{3,}$";
    if (text.match(descriptionPattern)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return false;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return true;
    }
}
/*delete input value after submit*/
function deleteInput(form) {
    document.getElementById("floatingname").value = "";
    document.getElementById("floatingcatagory").value = "";
    document.getElementById("floatingprice").value = "";
    document.getElementById("floatingQuantity").value = "";
    document.getElementById("floatingdescription").value = "";
    document.getElementById("floatingImage").value = "";
    form.querySelectorAll('.is-valid, .is-invalid').forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
}
/*vaalidate for close button and close icon to delete input*/
CloseButton.addEventListener("click", function () {
    deleteInput(form);
})
CloseIcon.addEventListener("click", function () {
    deleteInput(form);
})
/*-------------------------------------------------------------------------update---------------------------------------------------*/
SelectedTable.addEventListener("click", function (e) {
    stbBtn.value = "Save"
    if (e.target.classList.contains('fa-pen')) {
        $('#form').modal('show')
        let CurrentId = e.target.parentNode.parentNode.parentNode.firstChild.innerHTML;
        CurrentIndex = findProductIndexById(CurrentId)
        console.log(products[CurrentIndex])
        document.getElementById("floatingname").value = products[CurrentIndex].name
        document.getElementById("floatingcatagory").value = products[CurrentIndex].category
        document.getElementById("floatingprice").value = products[CurrentIndex].price
        document.getElementById("floatingQuantity").value = products[CurrentIndex].quantity
        document.getElementById("floatingdescription").value = products[CurrentIndex].description
        document.getElementById("floatingImage").value = products[CurrentIndex].image
        IsEdit = true
    }
})

/*-----------------------------------------------------------Delete----------------------------------------------------------------------------*/
SelectedTable.addEventListener("click", function (e) {
    if (e.target.classList.contains('fa-trash')) {
        $('#ConfirmDelete').modal('show');
        let CurrentId = e.target.parentNode.parentNode.parentNode.firstChild.innerHTML;
        let CurrentIndex = findProductIndexById(CurrentId);
        
        if (CurrentIndex !== -1) {
            DeleteBtn.addEventListener("click", handleDelete);
        }
        
        function handleDelete() {
            notifaction("delete", products[CurrentIndex].name)
            let isDeletable = true;
            console.log(CurrentId)
            if (CurrentIndex !== -1) {
                let pendingProducts = generatePendingProduct(_orders);
                for (let i = 0; i < pendingProducts.length; i++) {
                    if (CurrentId==pendingProducts[i]) {
                        alert("cant delete")
                        isDeletable = false;
                        break; 
                    }
                }
                if (isDeletable) {
                    products.splice(CurrentIndex, 1);
                    localStorage.setItem('products', JSON.stringify(products));
                    drawTable(GetSellerProduct(), SelectedTable, true);
                    isDeletable=true
                }
                $('#ConfirmDelete').modal('hide');
                DeleteBtn.removeEventListener("click", handleDelete);
            }
        }
    }
});

function findProductIndexById(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return i;
        }
    }
    return -1;
}
/*----------------------------------------------------------show id------------------------------------------------------------*/
SelectedTable.addEventListener("click",function(e){
    if(e.target.classList.contains("fa-eye")){
        let CurrentID = e.target.parentNode.parentNode.parentNode.firstChild.innerHTML;
        let CurrentProduct=GetSellerProduct().find(product=>product.id==CurrentID)
        console.log(CurrentProduct)
        alert(`${CurrentProduct.name} Current ID is: ${CurrentID}`)
    }   
})
/*-----------------------------------------------------------Search Table---------------------------------------------------------*/
SearchedProduct.addEventListener("keyup", function () {
    let inputValue = SearchedProduct.value.toLowerCase();
    let filterProduct = [];
    if (inputValue.trim() !== "") {
        filterProduct = GetSellerProduct().filter(function (item) {
            if (item.name.toLowerCase().includes(inputValue) || item.category.toLowerCase().includes(inputValue)) {
                return item;
            }
        });

    }
    else {
        filterProduct = GetSellerProduct()
    }
    console.log(filterProduct)
    drawTable(filterProduct, SelectedTable, true);
});

/*----------------------------------------------------sort table----------------------------------------------------------------*/
SelectedTable.addEventListener("click", function (e) {
    let SellerProduct = GetSellerProduct();
    if (e.target.classList.contains("sort-up")) {
        let key = e.target.parentNode.parentNode.textContent.trim();
        SellerProduct.sort(function (x, y) {
           
                return x[key] - y[key];
           
        });
        SwapSort = false
        drawTable(SellerProduct, SelectedTable, true);
        console.log("up");
    }
    else if (e.target.classList.contains("sort-down")) {
        let key = e.target.parentNode.parentNode.textContent.trim();
        SellerProduct.sort(function (x, y) {
            
           
                return y[key] - x[key];
            
        });
        SwapSort = true
        drawTable(SellerProduct, SelectedTable, true);
        console.log("down");
    }
})

/*----------------------------------------------------------notifaction-----------------------------------------------------------------*/
function notifaction(operation, name) {
    let x = document.getElementsByClassName("badge")[0].innerHTML;
    let NO_notif = parseInt(x);
    ++NO_notif;
    document.getElementsByClassName("badge")[0].innerHTML = NO_notif.toString();
    let Created_li = document.createElement("li")
    let Created_a = document.createElement("a")
    Created_a.classList.add("dropdown-item")
    Created_a.innerHTML = `you made ${operation} on ${name}`
    Created_li.appendChild(Created_a)
    let container = document.getElementsByClassName("dropdown-menu")[0]
    container.appendChild(Created_li)
}

/*--------------------------------------------------------Statictics-------------------------------------------------------------*/
let Prod_Stats = {
    No_Of_Product: GetSellerProduct().length,
    each_product_quantity: function () {
        let SellerProduct = GetSellerProduct();
        let No_Of_Product = GetSellerProduct().length
        let arr = [];
        for (let i = 0; i < No_Of_Product; i++) {
            let obj = {
                productname: SellerProduct[i].name,
                productQuantity: SellerProduct[i].quantity
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

localStorage.setItem('Prod_Stats', JSON.stringify(modifiedProdStats));

/*pending  product*/
function generatePendingProduct(_array){
    let pendingProductId=[]
let repetedPendingProduct=[]
    _array.filter(order=>{
        if(order.status=='pending'){
            for(let i=0;i<order._products_.length;i++){
                if(repetedPendingProduct.includes(order._products_[i].id)){
                    continue;
                }
                else{
                    pendingProductId.push(order._products_[i].id)
                    repetedPendingProduct.push(order._products_[i].id)
                    }
                }
        }
    })    
    return pendingProductId
}
//console.log(generatePendingProduct())
