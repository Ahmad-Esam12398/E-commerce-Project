
import { Person } from "./person.js";
import { products as originalProducts, persons as originalPersons } from "./data.js";
import { Product } from "./productsmodule.js"
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

function updatePersonsLocalStorage() {
    localStorage.setItem("Persons", JSON.stringify(persons));
}
function updateProductsLocalStorage(){
    localStorage.setItem("products", JSON.stringify(products));
}



let IsEdit = false
let CurrentIndex = 0
let SellerProduct = []
let SwapSort = true
let collapsed_button = document.getElementsByClassName("btn-collapse-sidebar")[0];
let side_bar = document.getElementById("sidebar");
let content = document.getElementById("content");
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
let SelectedEntry = document.getElementById("entry");
let CreateBtn = document.getElementById("create")
let SelectedTable = document.getElementById("product")




/*change value of modal when Add new product*/
CreateBtn.addEventListener("click", function () {
    stbBtn.value = "Add"
})


/* make collapsed button to narrow side bar and wide table*/
collapsed_button.addEventListener("click", function () {
    side_bar.classList.toggle("active");
    side_bar.classList.toggle("col-lg-1");
    side_bar.classList.toggle("col-lg-2");
    content.classList.toggle("col-lg-10");
    content.classList.toggle("col-lg-11");
});

/*make btn to show nav side bar in small screens */
btn_show_sidebar.addEventListener("click", function () {
    side_bar.classList.toggle("show-nav");
    side_bar.classList.remove("col-lg-2");
    side_bar.classList.add("fixed-width");
    content.classList.toggle("col-lg-10");
})

/*---------------------------------------------Get Seller Product to show in table--------------------------------------------------------*/

/*get seller information from persons*/
let activeUser = JSON.parse(localStorage.getItem("Active User"))
// let activeUser=persons[4]
console.log(activeUser.id);

localStorage.setItem("activeuser", JSON.stringify(activeUser));
console.log(activeUser.id)
/*get seller product it will return whole array of product*/
function GetSellerProduct() {
    let SellerId = activeUser.id
    let SellerProducts = products.filter(item => item.sellerID == SellerId)
    return SellerProducts
}
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
        modifiedHeader.push("operation");
    }
    for (let i = 0; i < modifiedHeader.length; i++) {
        let head = document.createElement("th");
        let sortSpan = document.createElement("span")
        if (!(modifiedHeader[i] == "image" || modifiedHeader[i] == "operation")) {
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
    }
    RowParent.appendChild(head_row);
}

/*-------------------------------------draw Table Row for product-------------------------------------------------------------*/
function drawRow(_array, RowIndex, RowParent, DrawOptionColumn, ...excludeColumns) {
    for (let key in _array[RowIndex]) {
        if (!excludeColumns.includes(key)) {
            let cell = document.createElement("td");
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

//  /*------ --------------------------------------------render Table -----------------------------------------------------*/
drawTable(SellerProduct, SelectedTable, true);
//   /*--------------------------------------------------------------------------------------------------------------------*/


/* -----------------------------------------------make crud operation on product(Create-Update-Delete)---------------------------*/

/*------------------Toggle between Create and Update---------- */
stbBtn.addEventListener("click", function (event) {                    //here create
    let OutOfForum = false;
    if (!IsEdit) {
        if (validatename(ProductName.value, ProductName) ||
            validatePrice(ProductPrice.value, ProductPrice) ||
            validateQuantity(ProductQuantity.value, ProductQuantity) ||
            validatename(ProductCatagory.value, ProductCatagory) ||
            validateImagePath(ProductImage.value,ProductImage||
            validatDescription(ProductDescription.value, ProductDescription)
            )

        ) {
            event.preventDefault();
        } else {
            let createobj = new Product(
                "DefaultName",
                0,
                0,
                "DefaultDescription",
                "DefaultImage",
                0,
                "DefaultCategory"
            );
            SetProduct(createobj);
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
            validatename(ProductCatagory.value, ProductCatagory) ||
            validatePrice(ProductPrice.value, ProductPrice) ||
            validateQuantity(ProductQuantity.value, ProductQuantity) ||
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
    pro.category = document.getElementById("floatingcatagory").value;
    pro.price = document.getElementById("floatingprice").value;
    pro.quantity = document.getElementById("floatingQuantity").value;
    pro.description = document.getElementById("floatingdescription").value;
    pro.image = document.getElementById("floatingImage").value;
    pro.sellerID = activeUser.id;
}

function validatename(_name, input) {
    let name = /^[A-Za-z\s]{4,}$/;
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

function validatDescription(_name, input) {
    let descriptionPattern = /^[A-Za-z0-9\s.,'"!?()-]+$/;
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
    let descriptionPattern = ".*\.[a-zA-Z]{3,4}$";
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
// ProductImage
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
            console.log(CurrentIndex);
            notifaction("delete", products[CurrentIndex].name)
            if (CurrentIndex !== -1) {
                products.splice(CurrentIndex, 1);
                localStorage.setItem('products', JSON.stringify(products));
                drawTable(GetSellerProduct(), SelectedTable, true);
            }
            $('#ConfirmDelete').modal('hide');
            DeleteBtn.removeEventListener("click", handleDelete);
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

/*-----------------------------------------------------------Search Table---------------------------------------------------------*/
SearchedProduct.addEventListener("keyup", function () {
    let inputValue = SearchedProduct.value.toLowerCase();
    let filterProduct = [];
    if (inputValue.trim() !== "") {
        filterProduct = SellerProduct.filter(function (item) {
            if (item.name.toLowerCase().includes(inputValue) || item.category.toLowerCase().includes(inputValue)) {
                return item;
            }
        });

    }
    else {
        filterProduct = SellerProduct
    }
    console.log(filterProduct)
    drawTable(filterProduct, SelectedTable, true);
});

/*-----------------------------------------------------entry for table----------------------------------------------------------*/
SelectedEntry.addEventListener("change", ShowEntry)

function ShowEntry() {
    let size = 0
    if (SelectedEntry.value == "Full") {
        size = SellerProduct.length
    }
    else {
        size = parseInt(SelectedEntry.value)
    }
    let ShownArrayEntry = []
    for (let i = 0; i < size; i++) {
        ShownArrayEntry.push(SellerProduct[i]);
    }
    // console.log(ShownArrayEntry)
    drawTable(ShownArrayEntry, SelectedTable, true);
}

/*----------------------------------------------------sort table----------------------------------------------------------------*/
SelectedTable.addEventListener("click", function (e) {
    let SellerProduct = GetSellerProduct();
    if (e.target.classList.contains("sort-up")) {
        let key = e.target.parentNode.parentNode.textContent.trim();
        SellerProduct.sort(function (x, y) {
            console.log(x[key] + "" + y[key])
            return x[key] - y[key];
        });
        SwapSort = false
        drawTable(SellerProduct, SelectedTable, true);
        console.log("up");
    }
    else if (e.target.classList.contains("sort-down")) {
        let key = e.target.parentNode.parentNode.textContent.trim();
        SellerProduct.sort(function (x, y) {
            console.log(x[key] + "" + y[key])
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
        let No_Of_Product = SellerProduct.length
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
console.log(modifiedProdStats.productQuantityData.map(item => item.productname))
console.log(modifiedProdStats.productQuantityData.map(item => item.productQuantity))

