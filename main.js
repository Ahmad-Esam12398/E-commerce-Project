import { Product } from "./products module.js";
import { Person } from "./person.js";
var products = [
    new Product("Product 1", 100, 10, "Description 1", "Image 1", 1),
    new Product("Product 2", 200, 20, "Description 2", "Image 2", 2),
    new Product("Product 3", 300, 30, "Description 3", "Image 3", 3),
    new Product("Product 4", 400, 40, "Description 4", "Image 4", 4),
    new Product("Product 5", 500, 50, "Description 5", "Image 5", 5),
]
var persons = [
    new Person("Person 1", "Email 1", "Password 1", "Address 1", "Phone 1", "Admin"),
    new Person("Person 2", "Email 2", "Password 2", "Address 2", "Phone 2", "Customer"),
    new Person("Person 3", "Email 3", "Password 3", "Address 3", "Phone 3", "Seller"),
    new Person("Person 4", "Email 4", "Password 4", "Address 4", "Phone 4", "Guest"),
    new Person("Person 5", "Email 5", "Password 5", "Address 5", "Phone 5", "Admin"),
]
console.log(products);
console.log(persons);