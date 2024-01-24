document.addEventListener("DOMContentLoaded", function () {
    const countries = document.getElementById("validationCustomcountry");
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

    var emailInput = document.getElementById("validationCustomEmail");
    var fnameInput = document.getElementById("validationCustomufname");
    var lnameInput = document.getElementById("validationCustomlname");
    var CompanyInput = document.getElementById("validationCustomCompany");
    var HouseInput = document.getElementById("validationCustomhousestreet");
    var TownInput = document.getElementById("validationCustomutown");
    var ZipInput = document.getElementById("validationCustomZip");
    var phoneinput = document.getElementById("validationCustomphone");
    var popupdiv = document.getElementById("popup");
    var submitBtn = document.getElementById("submitBtn");
    var form = document.querySelector("form");

    emailInput.addEventListener("input", validateEmail);
    fnameInput.addEventListener("input", validatefname);
    lnameInput.addEventListener("input", validatelname);
    CompanyInput.addEventListener("input", validteCompanyname);
    HouseInput.addEventListener("input", validateHOusennameandnumber);
    TownInput.addEventListener("input", validateTown);
    ZipInput.addEventListener("input", validateZip);
    phoneinput.addEventListener("input", validatephone);
   

    function openpop() {
        popupdiv.classList.add("open-popup");
    }

    function closspop() {
        popupdiv.classList.remove("open-popup");
    }

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();

        if (!validateEmail() || !validatefname() || !validatelname() || !validteCompanyname() || !validateHOusennameandnumber() || !validateTown() || !validateZip() || !validatephone()) {
            event.preventDefault();
        } else {
            saveFormData();
            openpop();
            clearForm(); 
            clearValidationClasses();
        }
    });


   
    
   
    function saveFormData() {
        var formData = {
            email: emailInput.value,
            fname: fnameInput.value,
            lname: lnameInput.value,
            Company: CompanyInput.value,
            House: HouseInput.value,
            Town: TownInput.value,
            Zip: ZipInput.value,
            phone: phoneinput.value,
        
        };

        localStorage.setItem("formData", JSON.stringify(formData));
    }

    function localeForm() {
        var savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
            var parsedFormData = JSON.parse(savedFormData);
            emailInput.value = parsedFormData.email;
            fnameInput.value = parsedFormData.fname;
            lnameInput.value = parsedFormData.lname;
            CompanyInput.value = parsedFormData.Company;
            HouseInput.value = parsedFormData.House;
            TownInput.value = parsedFormData.Town;
            ZipInput.value = parsedFormData.Zip;
            phoneinput.value = parsedFormData.phone;
            
        }
    }
    function clearValidationClasses() {
        emailInput.classList.remove("is-valid", "is-invalid");
        fnameInput.classList.remove("is-valid", "is-invalid");
        lnameInput.classList.remove("is-valid", "is-invalid");
        CompanyInput.classList.remove("is-valid", "is-invalid");
        HouseInput.classList.remove("is-valid", "is-invalid");
        TownInput.classList.remove("is-valid", "is-invalid");
        ZipInput.classList.remove("is-valid", "is-invalid");
        phoneinput.classList.remove("is-valid", "is-invalid");
    }

   
    localeForm();
    // clear page after sumbit
    function clearForm() {
        emailInput.value = "";
        fnameInput.value = "";
        lnameInput.value = "";
        CompanyInput.value = "";
        HouseInput.value = "";
        TownInput.value = "";
        ZipInput.value = "";
        phoneinput.value = "";
       
    }

    clearForm();

    function validateEmail() {
        var email = emailInput.value;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            emailInput.classList.remove("is-invalid")
            emailInput.classList.add("is-valid");
            return true; 
        } else {
            emailInput.classList.remove("is-valid")
            emailInput.classList.add("is-invalid");

            return false; 
        }
    }
    function validatefname() {
        var fname = fnameInput.value;
        var fnameRegax = /^[a-zA-Z\- ]+$/;

        if (fnameRegax.test(fname)) {
            fnameInput.classList.remove("is-invalid")
            fnameInput.classList.add("is-valid");
            return true; 
        } else {
            fnameInput.classList.remove("is-valid")
            fnameInput.classList.add("is-invalid");
            return false; 
        }
    }
    function validatelname() {
        var lname = lnameInput.value;
        var lnameRegax = /^[a-zA-Z\- ]+$/;

        if (lnameRegax.test(lname)) {
            lnameInput.classList.add("is-valid");
            lnameInput.classList.remove("is-invalid");
            return true; 
        } else {
            lnameInput.classList.remove("is-valid");
            lnameInput.classList.add("is-invalid");
            return false; 
        }
    }
    function validteCompanyname() {
        var Cname = CompanyInput.value;
        var CnameRegax = /^[a-zA-Z\- ]+$/;

        if (CnameRegax.test(Cname)) {
            CompanyInput.classList.add("is-valid");
            CompanyInput.classList.remove("is-invalid")
            return true; 
        } else {
            CompanyInput.classList.remove("is-valid");
            CompanyInput.classList.add("is-invalid");
            return false; 
        }
    }
    function validateHOusennameandnumber(){
        var Hname=HouseInput.value;
        var houseRegex=/^[a-zA-Z0-9]+$/;

        if (houseRegex.test(Hname)) {
            HouseInput.classList.add("is-valid");
            HouseInput.classList.remove("is-invalid")
            return true; 
        } else {
            HouseInput.classList.remove("is-valid");
            HouseInput.classList.add("is-invalid");
            return false; 
        }
        
    }
    function validateTown(){
        var tname=TownInput.value;
        var TownRegax=/^[a-zA-Z0-9]+$/;

        if (TownRegax.test(tname)) {
            TownInput.classList.add("is-valid");
            TownInput.classList.remove("is-invalid")
            return true; 
        } else {
            TownInput.classList.remove("is-valid");
            TownInput.classList.add("is-invalid");
            return false; 
        }
    }
    function validateZip(){
        var znum=ZipInput.value;
        var zipCodeRegex = /^\d{5}(?:-\d{4})?$/;

        if (zipCodeRegex.test(znum)) {
            ZipInput.classList.add("is-valid");
            ZipInput.classList.remove("is-invalid")
            return true; 
        } else {
            ZipInput.classList.remove("valid")
            ZipInput.classList.add("is-invalid");
            return false; 
        }

    }
    function validatephone(){
        var phone=phoneinput.value;
        var phoneNumberRegex = /^\d{10}$/;

        if (phoneNumberRegex.test(phone)) {
            phoneinput.classList.add("is-valid");
            phoneinput.classList.remove("is-invalid")
            return true; 
        } else {
            phoneinput.classList.remove("is-valid");
            phoneinput.classList.add("is-invalid");
            return false; 
        }

    }
    // function validteCountry(){
    //     var Countryname=countries.value
    //     if (Countryname !== "") {
    //         countries.classList.add("is-valid");
    //         return true;
    //     } else {
    //         countries.classList.add("is-invalid")
           
    //     }
    // }
});
