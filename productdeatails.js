document.addEventListener('DOMContentLoaded', () => {
    let productDetails; 

    const productId = getProductIdFromLocalStorage();

    if (productId) {
        productDetails = getProductDetails(productId);

        if (productDetails) {
            updateProductDetailPage(productDetails);
        } else {
            alert('Product not found');
        }
    } else {
        alert('Product ID not provided');
    }

    const plus = document.querySelector(".plus");
    const minus = document.querySelector(".minus");
    const num = document.querySelector(".num");

    let number = 1;

    plus.addEventListener("click", () => {
        if (productDetails && number < productDetails.quantity) {
            number++;
            num.innerText = number;
            console.log(number);
        } else {
            console.log("Cannot add more, reached maximum quantity");
        }
    });

    minus.addEventListener("click", () => {
        if (number === 1) {
            console.log("Can't decrease below 1");
        } else {
            number--;
            num.innerText = number;
        }
    });
});

function getProductIdFromLocalStorage() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
    // localStorage.getItem('id');

  
}

function getProductDetails(productId) {
    const productJSON = localStorage.getItem(productId);
    return productJSON ? JSON.parse(productJSON) : null;
}

function updateProductDetailPage(productDetails) {
    document.getElementById('product-category').innerText = `${productDetails.categorypath}`;
    document.getElementById('product-name').innerText = productDetails.name;
    document.getElementById('product-price').innerText = `Price: $${productDetails.price}`;
    document.getElementById('product-description').innerText = ` ${productDetails.description}`;
    document.getElementById('product-image').src = productDetails.image;
}




