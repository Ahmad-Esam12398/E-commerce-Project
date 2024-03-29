//data.js
import { Product } from "./productsmodule.js";
import { Person } from "./person.js";
// debugger;

var persons = [
    new Person(1, "Ahmad Esam", "Ahmad.esam1231998@gmail.com", "12345678", "Mahalla-Kubra-qqw", "01015328933", "Admin"),
    new Person(2, "AbdUllah Aiman", "Abdallah_aiman122@gmail.com", "12345678", "Mahalla-Kubra-q11", "01128461703", "Customer"),
    new Person(3, "Bothina Ahmed", "bothina_Ahmed332@gmail.com", "12345678", "Mansoura-qww-www", "01054921533", "Admin"),
    new Person(4, "Sara Mohamed", "sara_M23@gmail.com", `12345678`, "Mansoura-sasa-saqw", "01156897221", "Customer"),
    new Person(5, "Ahmad Mostafa", "AhmedMostafa1221@gmail.com", "12345678", "Fayoum-sass-qwee", "012365992370", "Seller"),
    new Person(6, "Fady Masoud", "FadyM122@gmail.com", "12345678", "Talkha-sad-asq", "01255891102", "Seller"),
    new Person(7, "Hamada Ali", "Hamada111@gmail.com", "12345678", "Tanta-sad-asq", "01099663383", "Seller")
];
var products = [
    new Product(1,'Bathroom Golden Ring Mirror', 124, 15, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/bathroom-circle-mirror.png', persons[4].id, 'Bathroom', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', 'Chair, Living Room'),
    new Product(2,'Bathroom Wooden Table', 550, 8, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis.', 'images/bathroom-wooden-table.png', persons[4].id, 'Bathroom', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', 'Chair, Living Room'),
    new Product(3,'Bedroom Single Chair', 504, 10, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupi.', 'images/bedroom-single-chair.png', persons[4].id, 'Bedroom', 'Home / Bedroom / Chair / Bedroom Single Chair', 'Bedroom, Chair'),
    new Product(4,'Beige Working Chair With Armrest', 784, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/working-chair-with-armrest.png', persons[5].id, 'Home Office', 'Home / Home Office / Beige Working Chair With Armrest', 'Home Office'),
    new Product(5,'Black Metal Lamp', 265, 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/black-metal-lamp.png', persons[4].id, 'Home Office', 'Home / Home Office / Black Metal Lamp', 'Home Office'),
    new Product(6,'Blue Comfy Fabric Chair', 580, 10, 'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.', 'images/single-blue-fabric-chair-1.png', persons[5].id, 'Bedroom', 'Home / Bedroom / Blue Comfy Fabric Chair', 'Bedroom'),
    new Product(7,'Brown Circle Stool', 224, 15, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/brown-wooden-stool.png', persons[5].id, 'Kitchen', 'Home / Kitchen / Stool / Brown Circle Stool', ' Kitchen, Stool'),
    new Product(8,'Brown Living Room Sofa', 1200, 8, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/living-room-brown-sofa.png', persons[5].id, 'Living Room', 'Home / Living Room / Sofa / Brown Living Room Sofa', 'Chair, Living Room, Sofa'),
    new Product(9,'Ceramic Oval Bathtub', 1120, 10, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/cream-ceramic-oval-bathtub.png', persons[5].id, 'Bathroom', 'Home / Bathroom / Ceramic Oval Bathtub', 'Bathroom'),
    new Product(10,'Egyptian Vase', 400, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/egyptian-brown-vase.png', persons[5].id, 'Home Office', 'Home / Living Room / Egyptian Vase', 'Home Office, Living Room'),
    new Product(11,'Green Living Room Sofa', 1200 , 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/living-room-green-sofa-.png', persons[5].id, 'Living Room', 'Home / Living Room / Sofa / Green Living Room Sofa', ' Living Room, Sofa'),
    new Product(12,'King Size Master Bedroom',1450 ,10,'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.','images/king-size-master-bedroom.png', persons[5].id,'Bedroom','Home / Bedroom / King Size Master Bedroom','Bedroom'),
    new Product(13,'Kitchen Cabinet',1150,10,'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.','images/kitchen-furniture-cabinet.png', persons[5].id,'Cabinet','Home / Kitchen / Cabinet / Kitchen Cabinet','Cabinet, Kitchen'),
    new Product(14,'Brown Circle Stool', 860, 15,'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/furniture-green-fabric-chair.png', persons[6].id, 'Cabinet', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', ' Cabinet, Living Room'),
    new Product(15,'Wall Hanging Cabinet',840, 8, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/wall-hanging-cabinet-.png', persons[6].id, 'Cabinet', 'Home / Living Room / Cabinet / Wall Hanging Cabinet', 'Cabinet, Living Room'),
    new Product(16,'White Kitchen Island',800, 10,'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.','images/kitchen-island-set.png',persons[6].id,'Kitchen','Home / Kitchen / White Kitchen Island',' Kitchen'),
    new Product(17,'Wooden Bath Room Stool', 220, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/wooden-stool.png', persons[6].id, 'Bathroom', 'Home / Bathroom / Wooden Bath Room Stool', 'Bathroom'),
    new Product(18,'Wooden Console Table', 120 , 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/wooden-console-table-.png', persons[6].id, 'Bedroom', 'Home / Home Office / Wooden Console Table', ' Bedroom, Home Office'),
];

let orders = [
    {
        orderId:1,
        _products_: [
            { id: products[1].id, name: products[1].name, quantity: 4 },
            { id: products[2].id, name: products[2].name, quantity: 5 },
            { id: products[6].id, name: products[6].name, quantity: 6 }
        ],
        Order_date: new Date('2024-01-15'),
        Delivered_date:new Date('2024-01-20'),
        status: 'pending',
        customerId: 2
    },
    {
        orderId:2,
        _products_: [
            { id: products[3].id, name: products[3].name, quantity: 2 },
            { id: products[4].id, name: products[4].name, quantity: 3 },
            { id: products[5].id, name: products[5].name, quantity: 4 }
        ],
        Order_date: new Date('2024-01-18'),
        Delivered_date:new Date('2024-01-22'),
        status: 'pending',
        customerId: 4
    },
    {
        orderId:3,
        _products_: [
            { id: products[7].id, name: products[7].name, quantity: 1 },
            { id: products[9].id, name: products[9].name, quantity: 2 },
            { id: products[10].id, name: products[10].name, quantity:3 }
        ],
        Order_date: new Date('2024-01-19'),
        Delivered_date:new Date('2024-01-22'),
        status: 'pending',
        customerId: 2
    },
    {
        orderId:4,
        _products_: [
            { id: products[11].id, name: products[11].name, quantity:4 },
            { id: products[12].id, name: products[12].name, quantity: 5 },
            { id: products[16].id, name: products[16].name, quantity: 2 }
        ],
        Order_date: new Date('2024-01-20'),
        Delivered_date:new Date('2024-01-23'),
        status: 'pending',
        customerId: 4
    },

    {
        orderId:5,
        _products_: [
            { id: products[3].id, name: products[3].name, quantity:1 },
            { id: products[7].id, name: products[7].name, quantity: 3 },
            { id: products[6].id, name: products[6].name, quantity: 2 }
        ],
        Order_date: new Date('2024-01-15'),
        Delivered_date:new Date('2024-01-17'),
        status: 'pending',
        customerId: 2
    },
    {
        orderId:6,
        _products_: [
            { id: products[11].id, name: products[11].name, quantity:2 },
            { id: products[12].id, name: products[12].name, quantity: 3 },
            { id: products[15].id, name: products[15].name, quantity: 4 }
        ],
        Order_date: new Date('2024-01-26'),
        Delivered_date:new Date('2024-01-28'),
        status: 'delivered',
        customerId: 4
    },
    {
        orderId:7,
        _products_: [
            { id: products[10].id, name: products[10].name, quantity:4 },
            { id: products[9].id, name: products[9].name, quantity: 5 },
            { id: products[1].id, name: products[1].name, quantity: 2 }
        ],
        Order_date: new Date('2024-01-10'),
        Delivered_date:new Date('2024-01-13'),
        status: 'delivered',
        customerId: 2
    },
    {
        orderId:8,
        _products_: [
            { id: products[2].id, name: products[2].name, quantity:2 },
            { id: products[8].id, name: products[8].name, quantity: 1 },
            { id: products[14].id, name: products[14].name, quantity: 1 }
        ],
        Order_date: new Date('2024-01-27'),
        Delivered_date:new Date('2024-01-29'),
        status: 'delivered',
        customerId: 4
    },
    {
        orderId:9,
        _products_: [
            { id: products[16].id, name: products[16].name, quantity:2 },
        ],
        Order_date: new Date('2024-01-27'),
        Delivered_date:new Date('2024-01-29'),
        status: 'delivered',
        customerId: 2
    },
    {
        orderId:10,
        _products_: [
            { id: products[1].id, name: products[1].name, quantity:2 },
            { id: products[2].id, name: products[2].name, quantity: 1 },
            { id: products[6].id, name: products[6].name, quantity: 1 }
        ],
        Order_date: new Date('2024-01-20'),
        Delivered_date:new Date('2024-01-25'),
        status: 'shipped',
        customerId: 4
    },
    {
        orderId:11,
        _products_: [
            { id: products[4].id, name: products[4].name, quantity:2 },
            { id: products[9].id, name: products[9].name, quantity: 1 },
            { id: products[14].id, name: products[14].name, quantity: 1 }
        ],
        Order_date: new Date('2024-01-22'),
        Delivered_date:new Date('2024-01-25'),
        status: 'shipped',
        customerId: 2
    },{
        orderId:12,
        _products_: [
            { id: products[7].id, name: products[7].name, quantity:2 },
            { id: products[8].id, name: products[8].name, quantity: 1 },
        ],
        Order_date: new Date('2024-01-22'),
        Delivered_date:new Date('2024-01-25'),
        status: 'shipped',
        customerId: 4
    }


];
    let originalOrders = [
    { id: 1, products: [1, 2, 6], quantities:[4, 5, 6], date: '15/01/2024', status: 'pending', customerId: 2 },
    { id: 2, products: [3, 4, 5], quantities:[2, 3, 4], date: '18/01/2024', status: 'pending', customerId: 4 },
    { id: 3, products: [7, 9, 10], quantities: [1, 2, 3], date: '19/01/2024', status: 'pending', customerId: 2 },
    { id: 4, products: [11, 12, 16], quantities: [4, 5, 2], date: '20/01/2024', status: 'pending', customerId: 4 },
    { id: 5, products: [3, 7, 6], quantities: [1, 3, 2], date: '15/01/2024', status: 'pending', customerId: 2 },
    { id: 6, products: [11, 12, 15], quantities: [2, 3, 4], date: '26/01/2024', status: 'delivered', customerId: 4 },
    { id: 7, products: [10, 9, 1], quantities: [4, 5, 2], date: '10/01/2024', status: 'delivered', customerId: 2 },
    { id: 8, products: [2, 8, 14], quantities: [2, 1, 1], date: '27/01/2024', status: 'delivered', customerId: 4 },
    { id: 9, products: [16], quantities: [2, 1, 1], date: '27/01/2024', status: 'delivered', customerId: 2 },
    { id: 10, products: [1, 2, 6], quantities: [2, 1, 1], date: '20/01/2024', status: 'shipped', customerId: 4 },
    { id: 11, products: [4, 9, 14], quantities: [2, 1, 1], date: '22/01/2024', status: 'shipped', customerId: 2 },
    { id: 12, products: [7, 8], quantities: [2, 1, 1], date: '22/01/2024', status: 'shipped', customerId: 4 },
];
export {products, persons,orders, originalOrders};

