//products module.js
class Product {
    static lastID = 1;
    #id; #name; #price; #quantity; #description; #image; #sellerID; #category;#categorypath;

    constructor(id, name, price, quantity, description, image, sellerID, category,categorypath) {
        this.#id = Product.lastID++;
        this.#name = name;
        this.#price = price;
        this.#quantity = +quantity;
        this.#description = description;
        this.#image = image;
        this.#category = category;
        this.#sellerID = +sellerID;
        this.#categorypath= categorypath;
        
    }
    
    
    set id(_id){
        if (id<0){
            this.#id=0;
        }
        else{
            this.#id=_id;
        }
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
    set name(name){
        if(name == ""){
            this.#name = "No name";
        }
        else{
            this.#name = name.trim();
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
        if(_category.trim()==""){
            this.#category="No catogray";
        }
        else {
            this.#category=_category.trim();
        }
    }
    set categorypath(_categorypath){
        if(_categorypath.trim()=""){
            this.#categorypath="NO Catograypath"
        }
        else{
            this.#categorypath=_categorypath.trim()
        }
    }
    get categorypath(){
        return this.#categorypath;
    }
    get id(){
        return this.#id;
    }
    get category(){
        return this.#category;
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
    getQuantity() {
        return this.#quantity;
    }

    getProductId() {
        return this.#id;
    }
    getProduct() {
        return {
          id: this.#id,
          name: this.#name,
          price: this.#price,
          quantity: this.#quantity,
          description: this.#description,
          image: this.#image,
          sellerID: this.#sellerID,
          category: this.#category,
          categorypath:this.#categorypath,
        };
      }
      addClickEvent(callback) {
        const productDiv = document.getElementById(`product-${this.#id}`);
        if (productDiv) {
          productDiv.addEventListener('click', () => {
            callback(this.#id);
          });
        }
      }
    }

    
export { Product};


