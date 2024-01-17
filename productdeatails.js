document.addEventListener("DOMContentLoaded", () => {
    let products = null;
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            console.log(products);
            showDetails();
        });

    function showDetails() {
        let detail = document.querySelector('.detail');
        let productId = new URLSearchParams(window.location.search).get('id');
        let thisproduct = products.filter(value => {
            return value.id == productId;
        })[0];
        if (!thisproduct) {
            window.location.href = "/";
        }
        detail.querySelector('.image img').src=thisproduct.image;
        detail.querySelector('.categorypath').innerText=thisproduct.categorypath;
        detail.querySelector('.name').innerText=thisproduct.name;
        detail.querySelector('.price').innerText=thisproduct.price;
        detail.querySelector('.description').innerText=thisproduct.description;
        detail.querySelector('.catograies').innerText=thisproduct.catograies;
    }
});




