import { persons } from "./data.js";
// Load Array of users
if (localStorage.getItem("Persons") == null) {
    var Persons = [];
    for (let i = 0; i < persons.length; i++) {
        Persons.push(persons[i].getPerson());
    }
    localStorage.setItem("Persons", JSON.stringify(Persons))
}
let usersArr = [];
usersArr = JSON.parse(localStorage.getItem("Persons"));

function checkEmail(mail) {
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email.toLowerCase() == mail.toLowerCase()) { return (i + 1); }
    }
    return false;
}

let em = 0, p = 0;
window.addEventListener("load", function () {
    // email
    document.getElementById("email").addEventListener("input", function () {
        if (!checkEmail(this.value)) {
            em = 0;
            this.classList.add("is-invalid");
            this.classList.remove("is-valid");
        }
        else {
            em = 1
            document.getElementById("")
            let userEmail = document.getElementById("email").value;
            let userIndex = checkEmail(userEmail) - 1;
            let userpass = usersArr[userIndex].password;
            let password = document.getElementById("password")

            // user didn't enter the correct password
            if (password.value != userpass) {
                p = 0;
                password.classList.add("is-invalid");
                password.classList.remove("is-valid");
            } else {
                p = 1;
                password.classList.add("is-valid");
                password.classList.remove("is-invalid");
            }
            this.classList.add("is-valid");
            this.classList.remove("is-invalid");
        }
    });// end of email

    //password
    document.getElementById("password").addEventListener("input", function () {

        if (!em) {// User didn't entered a valid email
            p = 0;
            this.classList.add("is-invalid");
            this.classList.remove("is-valid");
        }
        else {// User has entered a valid email
            let userEmail = document.getElementById("email").value;
            let userIndex = checkEmail(userEmail) - 1;
            let userpass = usersArr[userIndex].password;

            // user didn't enter the correct password
            if (this.value != userpass) {
                p = 0;
                this.classList.add("is-invalid");
                this.classList.remove("is-valid");
            } else {
                p = 1;
                this.classList.add("is-valid");
                this.classList.remove("is-invalid");
            }
        }
    });// end of password

    // sumbit button
    document.querySelector('form').addEventListener('submit', function (e) {
        var valid = em && p;
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