document.addEventListener("DOMContentLoaded", () => {
    const countries = document.getElementById("countrySelect");
    fetch('https://restcountries.com/v3.1/all').then(res => {
        return res.json();
    }).then(data => {
        let output = "";
        data.forEach(country => {
            output += `<option value="${country.name.common}">${country.name.common}</option>`;
        });
        countries.innerHTML = output;
    }).catch(error => {
        console.log("Error:", error);
    });

    var form = document.getElementById("myForm");
    var submitButton = document.getElementById("submit");

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

       
       clearError("perror");
       clearError("perror1");
       clearError("perror2");
       clearError("perror3");
       clearError("perror4");
       clearError("generalError");

       var hasError = false;

       if (!isEmailValid("email", "perror")) {
           console.log("sorry");
           hasError = true;
       }
       if (!isNameValid("fname", "perror1")) {
           console.log("sorry");
           hasError = true;
       }
       if (!isNameValid("lname", "perror2")) {
           console.log("sorry");
           hasError = true;
       }
       if (!isHouseNumberValid("hnum", "perror3")) {
           console.log("sorry");
           hasError = true;
       }
       if (!isPhoneValid("phone", "perror4")) {
           console.log("sorry");
           hasError = true;
       }

        else {
           form.submit();
       }
   });
});

function isEmailValid(emailId, errorId) {
    var emailtext = document.getElementById(emailId);
    var errorElement = document.getElementById(errorId);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailtext.value)) {
        console.log("Sorry");
        errorElement.innerHTML = "Sorry, you must write a valid email";
        return false;
    }

    return true;
}

function isNameValid(nameId, errorId) {
    var nametext = document.getElementById(nameId);
    var errorElement = document.getElementById(errorId);

    if (!/^[a-zA-Z]+$/.test(nametext.value)) {
        console.log("Sorry");
        errorElement.innerHTML = "Sorry, please enter a valid name";
        return false;
    }

    return true;
}

function isHouseNumberValid(houseNumberId, errorId) {
    var hnumtext = document.getElementById(houseNumberId);
    var errorElement = document.getElementById(errorId);

    if (hnumtext.value.trim() === "") {
        console.log("Sorry");
        errorElement.innerHTML = "Sorry, please enter a valid house number";
        return false;
    }

    return true;
}

function isPhoneValid(phoneId, errorId) {
    var phonetext = document.getElementById(phoneId);
    var errorElement = document.getElementById(errorId);

    if (!/^\d{10}$/.test(phonetext.value)) {
        console.log("Sorry");
        errorElement.innerHTML = "Sorry, please enter a valid phone number";
        return false;
    }

    return true;
}

function clearError(errorId) {
    var errorElement = document.getElementById(errorId);
    errorElement.innerHTML = "";
}

function displayGeneralError(message) {
    var generalError = document.getElementById("generalError");
    generalError.innerHTML = message;
}

