// get data  from product.json
document.addEventListener("DOMContentLoaded", () => {
    let products=null;
    fetch('products.json')
    .then(response =>response.json())
    .then(data =>{
        products =data;
        console.log(products);
        addDataToHTML();
    })
    let listProduct=document.querySelector(".listProduct")
    function addDataToHTML(){
        products.forEach(product => {
            // let productcatogray=document.createElement("p");
            // listProduct.appendChild(productcatogray);
            let newproduct=document.createElement('a');
            newproduct.style.textDecoration="none";
            newproduct.href='/productdetail.html?id='+ product.id;
            newproduct.classList.add('item');
            listProduct.appendChild(newproduct);
            newproduct.innerHTML= ` <img src="${product.image}">
            <p>${product.category}</p>
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>`;  
        });

    }
});