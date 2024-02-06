import { Person } from "./person.js";

window.addEventListener("load", function () {
    // get the active user if found and set to guest if not
    if (localStorage.getItem("Active User") == null) {
        let guest = new Person(-1, "", "", "", "", "", "Guest");
        localStorage.setItem("Active User", JSON.stringify(guest.getPerson()));
        this.location="home.html";
    } else {
        var activeUser = JSON.parse(localStorage.getItem("Active User"));
    }

    if (activeUser.role == "Guest") {
        document.getElementById("Guest").classList.remove("d-none");
        document.getElementById("Customer").classList.add("d-none");
        document.getElementById("Admin").classList.add("d-none");
        document.getElementById("Seller").classList.add("d-none");
    } else if (activeUser.role == "Admin") {
        document.getElementById("Guest").classList.add("d-none");
        document.getElementById("Customer").classList.add("d-none");
        document.getElementById("Admin").classList.remove("d-none");
        document.getElementById("Seller").classList.add("d-none");
        // Print User's Name
        this.document.getElementById("AdminName").innerText += " " + activeUser.name;
    } else if (activeUser.role == "Seller") {
        document.getElementById("Guest").classList.add("d-none");
        document.getElementById("Customer").classList.add("d-none");
        document.getElementById("Admin").classList.add("d-none");
        document.getElementById("Seller").classList.remove("d-none");
        // Print User's Name
        this.document.getElementById("SellerName").innerText = " " + activeUser.name;
    } else if (activeUser.role == "Customer") {
        document.getElementById("Guest").classList.add("d-none");
        document.getElementById("Customer").classList.remove("d-none");
        document.getElementById("Admin").classList.add("d-none");
        document.getElementById("Seller").classList.add("d-none");
        // Print User's Name
        this.document.getElementById("CustomerName").innerText = " " + activeUser.name;
    }
    let logout = document.getElementsByClassName("logout");
    for (let i = 0; i < logout.length; i++) {
        logout[i].addEventListener("click", function () {
            activeUser.role = "Guest";
            localStorage.removeItem("cart");
            localStorage.setItem("Active User", JSON.stringify(activeUser));
        });// end of logout
    }
});//end of load