class Person{
    static lastID = 0;
    #id; #name; #email; #password; #address; #phone; #role;
    constructor(name, email, password, address, phone, role){
        this.#id = ++Person.lastID;
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#address = address;
        this.#phone = phone;
        if(role != "Seller" && role != "Customer" && role != "Admin" && role != "Guest"){
            console.log("Invalid role");
            this.#role = "Guest";
            // throw new Error("Invalid role");
        }
        else{
        this.#role = role;
        }
    }
    set name(name){
        if(name.trim() == ""){
            this.#name = "No name";
        }
        else{
            this.#name = name.trim();
        }
    }
    set email(email){
        if(email.trim() == ""){
            this.#email = "No email";
        }
        else{
            this.#email = email.trim();
        }
    }
    set password(password){
        if(password == ""){
            this.#password = "password";
        }
    }
    set address(address){
        if(address.trim() == ""){
            this.#address = "No address";
        }
        else{
            this.#address = address.trim();
        }
    }
    set phone(phone){
        if(phone.trim() == ""){
            this.#phone = "No phone";
        }
        else{
            this.#phone = phone.trim();
        }
    }
    set role(role){
        const validRoles = ["admin", "customer", "seller", "guest"];
        if(validRoles.includes(role.trim().toLowerCase()) == false){
            this.#role = "guest";
        }
        else{
            this.#role = role.trim().toLowerCase();
        }
    }
    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }
    get email(){
        return this.#email;
    }
    get password(){
        return this.#password;
    }
    get address(){
        return this.#address;
    }
    get phone(){
        return this.#phone;
    }
    get role(){
        return this.#role;
    }
}

export { Person };