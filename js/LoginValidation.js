import { Person } from "../person.js";

// Load Array of users if existed and if not creat one with default user as admin.
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

function checkEmail(mail) {
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email1 == mail) { return (i + 1); }
    }
    return false;
}

let e = 0, p = 0;
window.addEventListener("load", function () {

    // email
    document.getElementById("email").addEventListener("input", function () {
        if (!checkEmail(this.value)) {
            e = 0;
            this.classList.add("is-invalid");
        }
        else {
            e = 1
            this.classList.remove("is-invalid");
        }
    });// end of email

    //password
    document.getElementById("password").addEventListener("input", function () {

        if (!e) {// User didn't entered a valid email
            p = 0;
            this.classList.add("is-invalid");
        }
        else {// User has entered a valid email
            let userEmail = document.getElementById("email").value;
            let userIndex = checkEmail(userEmail) - 1;
            let userpass = usersArr[userIndex].password;
            // user didn't enter the correct password
            if (this.value != userpass) {
                p = 0;
                console.log("ValidEmail"+userEmail+" "+userIndex+" "+userpass)
                this.classList.add("is-invalid");
            } else {
                p = 1;
                this.classList.remove("is-invalid");
            }
        }
    });// end of password

    // sumbit button
    document.querySelector('form').addEventListener('submit', function (e) {
        var valid = e && p;
        // Check if the form is valid
        if (!valid) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            let userEmail = document.getElementById("email").value;
            let userIndex = checkEmail(userEmail) - 1;
            localStorage.setItem("Active User", JSON.stringify(usersArr[userIndex]));
            e.target.classList.add('was-validated');

        }
    });// end of sumbit
    //Show password
    document.getElementById("ShowPassword").addEventListener("click", function () {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
});// end of load