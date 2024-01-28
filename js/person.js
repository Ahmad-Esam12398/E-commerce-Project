class Person {
    static lastID = localStorage.getItem("lastIDPerson") ? +(localStorage.getItem("lastIDPerson")) : 0;
    #id; #name; #email; #password; #address; #phone; #role;
    constructor(_name, _email, _password, _address, _phone, _role) {
        // debugger;
        this.#id = ++(Person.lastID);
        localStorage.setItem("lastIDPerson", Person.lastID);
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.address = _address;
        this.phone = _phone;
        this.role = _role;
    }
    set name(_name) {
        if (_name.trim() == "") {
            this.#name = "No name";
        }
        else {
            this.#name = _name.trim();
        }
    }
    set email(_email) {
        if (_email.trim() == "") {
            this.#email = "No email";
        }
        else {
            this.#email = _email.trim();
        }
    }
    set password(_password) {
        if (_password == "") {
            this.#password = "No Password";
        } else {
            this.#password = _password;
        }
    }
    set address(address) {
        if (address.trim() == "") {
            this.#address = "No address";
        }
        else {
            this.#address = address.trim();
        }
    }
    set phone(phone) {
        if (phone.trim() == "") {
            this.#phone = "No phone";
        }
        else {
            this.#phone = phone.trim();
        }
    }
    set role(_role) {
        const validRoles = ["Admin", "Customer", "Seller", "Guest"];
        if (!validRoles.includes(_role.trim())) {
            this.#role = "Guest";
        }
        else {
            this.#role = _role;
        }
    }
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }
    get address() {
        return this.#address;
    }
    get phone() {
        return this.#phone;
    }
    get role() {
        return this.#role;
    }
    getPerson() {
        return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            password: this.#password,
            address: this.#address,
            phone: this.#phone,
            role: this.#role
        }
    }
    setPerson(name, email, password, address, phone, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.role = role;
    }
}

export { Person };