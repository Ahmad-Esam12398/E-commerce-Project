import { Person } from "../person.js";
if (localStorage.getItem("users") == null) {
    let admin = new Person("admin1", "admin@jsg2.com", "adminjsg2", "masr-heya-omi", "01000000000", "admin");
    var usersArr = new Array;
    usersArr.push(
        {
            ID: admin.id,
            name: admin.name,
            email: admin.email,
            password: admin.password,
            address: admin.address,
            phoneNumber: admin.phone,
            role: admin.role
        }
    );
    localStorage.setItem("users", JSON.stringify(usersArr));
} else {
    usersArr = JSON.parse(localStorage.getItem("users"));
}

// function to check E-mail
function checkEmail(mail) {
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i][email] == mail)
            return true;
        return false;
    }
}
// ====================== Sign-Up Validation ======================
// name
window.addEventListener("load", function () {

    document.getElementById("name").addEventListener("input", function () {
        if (this.value.trim().length < 3) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
    // email
    document.getElementById("email").addEventListener("input", function () {
        let mail = document.getElementById("email").value;
        if (checkEmail(mail) || !this.value.match(/^[a-zA-Z][a-zA-Z0-9_\.]*@[a-zA-Z]+.com$/)) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
    //password
    document.getElementById("password").addEventListener("input", function () {
        if (this.value.trim().length < 6) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
    // passwordcheck
    document.getElementById("passwordCheck").addEventListener("input", function () {
        let password = document.getElementById("password").value;
        if (password != this.value) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
    //Phone number
    document.getElementById("phone").addEventListener("input", function () {
        if (this.value.length != 11 || (!this.value.startsWith("010") && !this.value.startsWith("011") && !this.value.startsWith("012") && !this.value.startsWith("015"))) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
    // address
    document.getElementById("address").addEventListener("input", function () {
        let address = this.value.trim();
        let addressArr = address.split("-");
        if (addressArr.length != 3) {
            this.classList.add("is-invalid");
        }
        else if (addressArr[0].length < 3 || addressArr[1].length < 3 || addressArr[2].length < 3) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
    // sumbit button
    document.querySelectorAll('form')[0].addEventListener('submit', function (e) {
        // Check if the form is valid
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let phone = document.getElementById("phone").value;
            let address = document.getElementById("address").value;

            if (email!="No email") {
                let newuser = new Person(name, email, password, address, phone, "customer");
                usersArr.push(
                    {
                        ID: newuser.id,
                        name: newuser.name,
                        email: newuser.email,
                        password: newuser.password,
                        address: newuser.address,
                        phoneNumber: newuser.phone,
                        role: newuser.role
                    }
                );
                localStorage.setItem("users", JSON.stringify(usersArr));
            }
        }
        e.target.classList.add('was-validated');
    });
    // Toggle password box
    document.getElementById("ShowPasswordCheck").addEventListener("click", function () {
        var x = document.getElementById("passwordCheck");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
    // Toggle Check password box
    document.getElementById("ShowPassword").addEventListener("click", function () {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
});// end of load