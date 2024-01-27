// main .js
import { Product } from "./productsmodule.js";
import { Person } from "./person.js";
// debugger;
var persons = [
    new Person("Ahmad Esam", "Ahmad.esam1231998@gmail.com", "12345678", "Mahalla-Kubra-qqw", "01015328933", "Admin"),
    new Person("AbdUllah Aiman", "Abdallah_aiman122@gmail.com", "12345678", "Mahalla-Kubra-q11", "01128461703", "Customer"),
    new Person("Bothina Ahmed", "bothina_Ahmed332@gmail.com", "12345678", "Mansoura-qww-www", "01054921533", "Admin"),
    new Person("Sara Mohamed", "sara_M23@gmail.com", `12345678`, "Mansoura-sasa-saqw", "01156897221", "Customer"),
    new Person("Ahmad Mostafa", "AhmedMostafa1221@gmail.com", "12345678", "Fayoum-sass-qwee", "012365992370", "Seller"),
    new Person("Fady Masoud", "FadyM122@gmail.com", "12345678", "Talkha-sad-asq", "01255891102", "Seller"),
    new Person("Hamada Ali", "Hamada111@gmail.com", "12345678", "Tanta-sad-asq", "01099663383", "Seller")
];
var products = [
    new Product('Bathroom Golden Ring Mirror', 124, 15, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/bathroom-circle-mirror.png', persons[4].id, 'Bathroom', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', 'Chair, Living Room'),
    new Product('Bathroom Wooden Table', 550, 8, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis.', 'images/bathroom-wooden-table.png', persons[4].id, 'Bathroom', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', 'Chair, Living Room'),
    new Product('Bedroom Single Chair', 504, 10, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupi.', 'images/bedroom-single-chair.png', persons[4].id, 'Bedroom', 'Home / Bedroom / Chair / Bedroom Single Chair', 'Bedroom, Chair'),
    new Product('Beige Working Chair With Armrest', 784, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/working-chair-with-armrest.png', persons[5].id, 'Home Office', 'Home / Home Office / Beige Working Chair With Armrest', 'Home Office'),
    new Product('Black Metal Lamp', 265, 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/black-metal-lamp.png', persons[4].id, 'Home Office', 'Home / Home Office / Black Metal Lamp', 'Home Office'),
    new Product('Blue Comfy Fabric Chair', 580, 10, 'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.', 'images/single-blue-fabric-chair-1.png', persons[5].id, 'Bedroom', 'Home / Bedroom / Blue Comfy Fabric Chair', 'Bedroom'),
    new Product('Brown Circle Stool', 224, 15, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/brown-wooden-stool.png', persons[5].id, 'Kitchen', 'Home / Kitchen / Stool / Brown Circle Stool', ' Kitchen, Stool'),
    new Product('Brown Living Room Sofa', 1200, 8, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/living-room-brown-sofa.png', persons[5].id, 'Living Room', 'Home / Living Room / Sofa / Brown Living Room Sofa', 'Chair, Living Room, Sofa'),
    new Product('Ceramic Oval Bathtub', 1120, 10, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/cream-ceramic-oval-bathtub.png', persons[5].id, 'Bathroom', 'Home / Bathroom / Ceramic Oval Bathtub', 'Bathroom'),
    new Product('Egyptian Vase', 400, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/egyptian-brown-vase.png', persons[5].id, 'Home Office', 'Home / Living Room / Egyptian Vase', 'Home Office, Living Room'),
    new Product('Green Living Room Sofa', 1200 , 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/living-room-green-sofa-.png', persons[5].id, 'Living Room', 'Home / Living Room / Sofa / Green Living Room Sofa', ' Living Room, Sofa'),
    new Product('King Size Master Bedroom',1450 ,10,'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.','images/king-size-master-bedroom.png',persons[5].id,'Bedroom','Home / Bedroom / King Size Master Bedroom','Bedroom'),
    new Product('Kitchen Cabinet',1150,10,'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.','images/kitchen-furniture-cabinet.png',persons[6].id,'Cabinet','Home / Kitchen / Cabinet / Kitchen Cabinet','Cabinet, Kitchen'),
    new Product('Brown Circle Stool', 860, 15,'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/furniture-green-fabric-chair.png', persons[6].id, 'Cabinet', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', ' Cabinet, Living Room'),
    new Product('Wall Hanging Cabinet',840, 8, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/wall-hanging-cabinet-.png', persons[6].id, 'Cabinet', 'Home / Living Room / Cabinet / Wall Hanging Cabinet', 'Cabinet, Living Room'),
    new Product('White Kitchen Island',800, 10,'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.','images/kitchen-island-set.png',persons[6].id,'Kitchen','Home / Kitchen / White Kitchen Island',' Kitchen'),
    new Product('Wooden Bath Room Stool', 220, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/wooden-stool.png', persons[6].id, 'Bathroom', 'Home / Bathroom / Wooden Bath Room Stool', 'Bathroom'),
    new Product('Wooden Console Table', 120 , 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/wooden-console-table-.png', persons[5].id, 'Bedroom', 'Home / Home Office / Wooden Console Table', ' Bedroom, Home Office'),
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
        Order_date: new Date('2024-01-2'),
        Delivered_date:new Date('2024-01-4'),
        status: 'pending',
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
            { id: products[2].id, name: products[2].name, quantity:4 },
            { id: products[8].id, name: products[8].name, quantity: 5 },
            { id: products[14].id, name: products[14].name, quantity: 2 }
        ],
        Order_date: new Date('2024-01-2'),
        Delivered_date:new Date('2024-01-5'),
        status: 'delivered',
        customerId: 4
    }];
    let originalOrders = [
    { id: 1, products: [products[1], products[2], products[6]], quantities:[1, 2, 3], date: new Date('2024-01-20'), status: 'pending', customerName: 'ahmed' },
    { id: 2, products: [products[4], products[9], products[14]], quantities:[2, 3, 4], date: new Date('2024-01-22'), status: 'pending', customerName: 'ali' },
    { id: 3, products: [products[7], products[8]], quantities: [2, 1, 1], date: new Date('2024-01-05'), status: 'pending', customerName: 'mohamed' },
    { id: 4, products: [products[10], products[15], products[14]], quantities: [2, 1, 1], date: new Date('2024-01-27'), status: 'pending', customerName: 'ismail' },
    { id: 5, products: [products[17]], quantities: [2, 1, 1], date: new Date('2024-01-27'), status: 'pending', customerName: 'hatem' },
    { id: 6, products: [products[15], products[14]], quantities: [2, 1, 1], date: new Date('2024-01-27'), status: 'delivered', customerName: 'hassan' },
    { id: 7, products: [products[0], products[3], products[5]], quantities: [2, 1, 1], date: new Date('2024-01-27'), status: 'delivered', customerName: 'hassan' },
    { id: 8, products: [products[11], products[12], products[13]], quantities: [2, 1, 1], date: new Date('2024-01-27'), status: 'delivered', customerName: 'hassan' },
    { id: 9, products: [products[16]], quantities: [2, 1, 1], date: new Date('2024-01-27'), status: 'delivered', customerName: 'hassan' },
    { id: 10, products: [products[1], products[2], products[6]], quantities: [2, 1, 1], date: new Date('2024-01-20'), status: 'shipped', customerName: 'ahmed' },
    { id: 11, products: [products[4], products[9], products[14]], quantities: [2, 1, 1], date: new Date('2024-01-22'), status: 'shipped', customerName: 'ali' },
    { id: 12, products: [products[7], products[8]], quantities: [2, 1, 1], date: new Date('2024-01-05'), status: 'shipped', customerName: 'mohamed' },
];
export {products, persons,orders, originalOrders};

