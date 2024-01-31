//products module .js
class Product{
    static lastID = localStorage.getItem("lastIDProduct") ? +(localStorage.getItem("lastIDProduct")) : 0;
    #id; #name; #price; #quantity; #description; #image; #sellerID; #category; #categorypath; #otherCategory;
    constructor(id,name, price, quantity, description, image, sellerID, category, categorypath = 'Home / Home Office / Black Metal Lamp', otherCategory = category){
        // debugger;
        this.id = id;
        localStorage.setItem("lastIDProduct", Product.lastID);
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.image = image;
        this.sellerID = sellerID;
        this.category = category;
        this.categorypath = categorypath;
        this.otherCategory = otherCategory;
    }
    set id(_id){
        this.#id = _id;
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
            this.#price = _price;
        }
    }
    set name(_name){
        if(_name == ""){
            this.#name = "No name";
        }
        else{
            this.#name = _name.trim();
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
            this.#sellerID = +_sellerID;
        }
    }
    set category(_category){
        const validRooms = ['Bathroom', 'Bedroom', 'Home Office', 'Kitchen', 'Living Room', 'Cabinet'];
        if(validRooms.includes(_category)){
            this.#category = _category;
        }
        else{
            this.#category = 'Other';
        }
    }
    set categorypath(_categorypath){
        this.#categorypath = _categorypath;
    }
    set otherCategory(_otherCategory){
        this.#otherCategory = _otherCategory;
    }
    get category(){
        return this.#category;
    }
    get id(){
        return this.#id;
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
    getProduct(){
        return {
            id: this.#id,
            name: this.#name,
            price: this.#price,
            quantity: this.#quantity,
            description: this.#description,
            image: this.#image,
            sellerID: this.#sellerID,
            category: this.#category,
            categoryPath: this.#categorypath,
            otherCategory: this.#otherCategory,
        }
    }
    setProduct(name, price, quantity, description, image, sellerID, category){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.image = image;
        this.sellerID = sellerID;
        this.category = category;
    }
}
export { Product };



