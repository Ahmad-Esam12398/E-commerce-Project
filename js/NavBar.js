import { Person } from "../person.js";

window.addEventListener("load", function () {
    // get the active user if found and set to guest if not
    if (localStorage.getItem("Active User") == null) {
        let guest = new Person();
        guest.role = "guest";
        localStorage.setItem("Active User", JSON.stringify(guest));
    } else {
        var activeUser = JSON.parse(localStorage.getItem("Active User"));
    }

    if (activeUser.role == "guest") {
        document.getElementById("Guest").classList.remove("d-none");
        document.getElementById("Customer").classList.add("d-none");
        document.getElementById("Admin").classList.add("d-none");
        document.getElementById("Seller").classList.add("d-none");
    } else if (activeUser.role == "admin") {
        document.getElementById("Guest").classList.add("d-none");
        document.getElementById("Customer").classList.add("d-none");
        document.getElementById("Admin").classList.remove("d-none");
        document.getElementById("Seller").classList.add("d-none");
        // Print User's Name
        this.document.getElementById("AdminName").innerText = "Welcome " + activeUser.name;
    } else if (activeUser.role == "seller") {
        document.getElementById("Guest").classList.add("d-none");
        document.getElementById("Customer").classList.add("d-none");
        document.getElementById("Admin").classList.add("d-none");
        document.getElementById("Seller").classList.remove("d-none");
        // Print User's Name
        this.document.getElementById("SellerName").innerText = "Welcome " + activeUser.name;
    } else if (activeUser.role == "customer") {
        document.getElementById("Guest").classList.add("d-none");
        document.getElementById("Customer").classList.remove("d-none");
        document.getElementById("Admin").classList.add("d-none");
        document.getElementById("Seller").classList.add("d-none");
        // Print User's Name
        this.document.getElementById("CustomerName").innerText = "Welcome " + activeUser.name;
    }
    let logout = document.getElementsByClassName("logout");
    for (let i = 0; i < logout.length; i++) {
        logout[i].addEventListener("click", function () {
            activeUser.role = "guest";
            localStorage.setItem("Active User", JSON.stringify(activeUser));
        });// end of logout
    }
});//end of load