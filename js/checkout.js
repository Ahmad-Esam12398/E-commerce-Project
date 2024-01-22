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

        var emailinput = document.getElementById("email");
        var nameinput = document.getElementById("name");
        var houseinput = document.getElementById("houseNumber");
        var phoneinput = document.getElementById("phone");

        if (!isEmailValid(emailinput, "perror")) {
            console.log("sorry");
            hasError = true;
        }
        if (!isNameValid(nameinput, "perror1")) {
            console.log("sorry");
            hasError = true;
        }
        if (!isNameValid(nameinput, "perror2")) {
            console.log("sorry");
            hasError = true;
        }
        if (!isHouseNumberValid(houseinput, "perror3")) {
            console.log("sorry");
            hasError = true;
        }
        if (!isPhoneValid(phoneinput, "perror4")) {
            console.log("sorry");
            hasError = true;
        }

        else {
            form.submit();
        }
    });
});

function isEmailValid(emailElement, errorId) {
    var errorElement = document.getElementById(errorId);

    if (!emailElement.value.trim().match(/@gmail\.com$/ && /^[0-9a-zA-Z]/) || emailElement.value.trim() === "") {
        console.log("Sorry");
        errorElement.innerHTML = "Sorry, you must write a valid email";
        return false;
    }

    return true;
}

function isNameValid(nameElement, errorId) {
    var errorElement = document.getElementById(errorId);

    if (!nameElement.value.trim().match(/^[a-zA-Z]+$/) || nameElement.value.trim() === "") {
        console.log("Sorry");
        errorElement.innerHTML = "Sorry, please enter a valid name";
        return false;
    }

    return true;
}

function isHouseNumberValid(housenumber, errorId) {
    var errorElement = document.getElementById(errorId);

    if (housenumber.value.trim() === "") {
        console.log("Sorry");
        errorElement.innerHTML = "Sorry, please enter a valid house number";
        return false;
    }

    return true;
}


function isPhoneValid(phoneElement, errorId) {
      var errorElement = document.getElementById(errorId);

      if (!phoneElement.value.trim().match(/^\d{10}$/) || phoneElement.value.trim() === "") {
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

