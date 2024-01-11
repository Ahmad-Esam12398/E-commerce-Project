class Product{
    static lastID = 0;
    #id; #name; #price; #quantity; #description; #image; #sellerID;
    constructor(id, name, price, quantity, description, image, sellerID){
        this.#id = ++Product.lastID;
        this.#name = name;
        this.#price = price;
        this.#quantity = quantity;
        this.#description = description;
        this.#image = image;
        this.#sellerID = sellerID;
    }
    set quantity(_quantity){
        if(_quantity < 0){
            this.#quantity = 0;
        }
        else{
            this.#quantity = +_quantity;
        }
    }
    set price(_price){
        if(_price < 0){
            this.#price = 0;
        }
        else{
            this.#price = +_price;
        }
    }
    set name(name){
        if(name == ""){
            this.#name = "No name";
        }
        else{
            this.#name = name;
        }
    }
    set description(_description){
        if(_description.trim() == ""){
            this.#description = "No description";
        }
        else{
            this.#description = _description.trim();
        }
    }
    set image(_image){
        if(_image.trim() == ""){
            this.#image = "No image";
        }
        else{
            this.#image = _image.trim();
        }
    }
    set sellerID(_sellerID){
        if(_sellerID < 0){
            this.#sellerID = 0;
        }
        else{
            this.#sellerID = _sellerID;
        }
    }
    get quantity(){
        return this.#quantity;
    }
    get price(){
        return this.#price;
    }
    get name(){
        return this.#name;
    }
    get description(){
        return this.#description;
    }
    get image(){
        return this.#image;
    }
    get sellerID(){
        return this.#sellerID;
    }
}
export { Product };
