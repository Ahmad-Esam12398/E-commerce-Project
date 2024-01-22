
// ====================== Sign-Up Validation ======================
// name
window.addEventListener("load", function () {
    
});
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
        if (!this.value.match(/^[a-zA-Z][a-zA-Z0-9_\.]*@[a-zA-Z]+.com$/)) {
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
            return;
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

        }
        e.target.classList.add('was-validated');
    });
    document.getElementById("ShowPasswordCheck").addEventListener("click", function () {
        var x = document.getElementById("passwordCheck");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
    document.getElementById("ShowPassword").addEventListener("click", function () {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
