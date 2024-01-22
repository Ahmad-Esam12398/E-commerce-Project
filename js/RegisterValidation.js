import { Person } from "../person.js";
if (localStorage.getItem("users") == null) {
    let admin = new Person("admin1", "admin@jsg2.com", "adminjsg2", "masr-heya-omi", "01000000000", "admin");
    let usersArr1 = new Array;
    usersArr1.push(
        {
            ID: admin.id,
            name: admin.name,
            email1: admin.email,
            password: admin.password,
            address: admin.address,
            phoneNumber: admin.phone,
            role: admin.role
        }
    );
    localStorage.setItem("users", JSON.stringify(usersArr1));
} else {
    var usersArr = JSON.parse(localStorage.getItem("users"));
}

// function to check E-mail
function checkEmail(mail) {
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email1 == mail) { return true; }
    }
    return false;
}
// function to check E-mail
function checkPhone(phone) {
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].phoneNumber == phone) { return true; }
    }
    return false;
}
var n = 0, e = 0, p1 = 0, p2 = 0, ph = 0, ad = 0;
// ====================== Sign-Up Validation ======================

window.addEventListener("load", function () {
    // name
    document.getElementById("name").addEventListener("input", function () {
        if (this.value.trim().length < 3) {
            n = 0;
            this.classList.add("is-invalid");
        }
        else {
            n = 1;
            this.classList.remove("is-invalid");
        }
    });

    // email
    document.getElementById("email").addEventListener("input", function () {
        if (!this.value.match(/^[a-zA-Z][a-zA-Z0-9_\.]*@[a-zA-Z]+.com$/)) {
            // console.log(usersArr[1].phoneNumber.constructor.name)
            e = 0;
            this.classList.add("is-invalid");
            console.log(checkEmail(this.value))
        }
        else if (checkEmail(this.value)) {
            e = 0
            alert("E-mail is already used");
            this.classList.add("is-invalid");
        }
        else {
            e = 1
            this.classList.remove("is-invalid");
        }
    });
    //password
    document.getElementById("password").addEventListener("input", function () {
        if (this.value.trim().length < 6) {
            p1 = 0;
            this.classList.add("is-invalid");
        }
        else {
            var passCheck = document.getElementById("passwordCheck");
            if (passCheck.value != this.value) { p2 = 0; passCheck.classList.add("is-invalid"); }
            p1 = 1;
            this.classList.remove("is-invalid");
        }
    });
    // passwordcheck
    document.getElementById("passwordCheck").addEventListener("input", function () {
        let password = document.getElementById("password").value;
        if (password != this.value) {
            p2 = 0;
            this.classList.add("is-invalid");
        }
        else {
            p2 = 1;
            this.classList.remove("is-invalid");
        }
    });

    //Phone number
    document.getElementById("phone").addEventListener("input", function () {
        if (this.value.length != 11 || !(this.value.startsWith("010") || this.value.startsWith("011") || this.value.startsWith("012") || this.value.startsWith("015"))) {
            ph = 0;
            this.classList.add("is-invalid");
        }
        else if (checkPhone(this.value)) {
            ph = 0;
            alert("Number is already used");
            this.classList.add("is-invalid");
        }
        else {
            ph = 1;
            this.classList.remove("is-invalid");
        }
    });

    // address
    document.getElementById("address").addEventListener("input", function () {
        let address = this.value.trim();
        let addressArr = address.split("-");
        if (addressArr.length != 3) {
            ad = 0;
            this.classList.add("is-invalid");
        }
        else if (addressArr[0].length < 3 || addressArr[1].length < 3 || addressArr[2].length < 3) {
            ad = 0;
            this.classList.add("is-invalid");
        }
        else {
            ad = 1;
            this.classList.remove("is-invalid");
        }
    });

    // sumbit button
    document.querySelectorAll('form')[0].addEventListener('submit', function (e) {
        var valid = n && e && p1 && p2 && ph && ad;
        // Check if the form is valid
        if (!valid) {
            console.log("Invalid" + valid);
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            console.log("valid" + valid);
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let phone = document.getElementById("phone").value;
            let address = document.getElementById("address").value;


            let newuser = new Person(name, email, password, address, phone, "customer");
            usersArr.push(
                {
                    ID: newuser.id,
                    name: newuser.name,
                    email1: newuser.email,
                    password: newuser.password,
                    address: newuser.address,
                    phoneNumber: newuser.phone,
                    role: newuser.role
                }
            );
            localStorage.setItem("users", JSON.stringify(usersArr));
            e.target.classList.add('was-validated');

        }
    });
    // Toggle password box
    document.getElementById("ShowPassword").addEventListener("click", function () {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
    // Toggle Check password box
    document.getElementById("ShowPasswordCheck").addEventListener("click", function () {
        var x = document.getElementById("passwordCheck");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
});// end of load