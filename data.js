// main .js
import { Product } from "./products module.js";
import { Person } from "./person.js";
// debugger;
var products = [
    new Product('Bathroom Golden Ring Mirror', 124, 15, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/bathroom-circle-mirror.png', 1, 'Bathroom', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', 'Chair, Living Room'),
    new Product('Bathroom Wooden Table', 550, 8, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis.', 'images/bathroom-wooden-table.png', 1, 'Bathroom', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', 'Chair, Living Room'),
    new Product('Bedroom Single Chair', 504, 10, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupi.', 'images/bedroom-single-chair.png', 1, 'Bedroom', 'Home / Bedroom / Chair / Bedroom Single Chair', 'Bedroom, Chair'),
    new Product('Beige Working Chair With Armrest', 784, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/working-chair-with-armrest.png', 2, 'Home Office', 'Home / Home Office / Beige Working Chair With Armrest', 'Home Office'),
    new Product('Black Metal Lamp', 265, 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/black-metal-lamp.png', 1, 'Home Office', 'Home / Home Office / Black Metal Lamp', 'Home Office'),
    new Product('Blue Comfy Fabric Chair', 580, 10, 'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.', 'images/single-blue-fabric-chair-1.png', 2, 'Bedroom', 'Home / Bedroom / Blue Comfy Fabric Chair', 'Bedroom'),
    new Product('Brown Circle Stool', 224, 15, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/brown-wooden-stool.png', 2, 'Kitchen', 'Home / Kitchen / Stool / Brown Circle Stool', ' Kitchen, Stool'),
    new Product('Brown Living Room Sofa', 1200, 8, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/living-room-brown-sofa.png', 2, 'Living Room', 'Home / Living Room / Sofa / Brown Living Room Sofa', 'Chair, Living Room, Sofa'),
    new Product('Ceramic Oval Bathtub', 1120, 10, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/cream-ceramic-oval-bathtub.png', 2, 'Bathroom', 'Home / Bathroom / Ceramic Oval Bathtub', 'Bathroom'),
    new Product('Egyptian Vase', 400, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/egyptian-brown-vase.png', 2, 'Home Office', 'Home / Living Room / Egyptian Vase', 'Home Office, Living Room'),
    new Product('Green Living Room Sofa', 1200, 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/living-room-green-sofa-.png', 2, 'Living Room', 'Home / Living Room / Sofa / Green Living Room Sofa', ' Living Room, Sofa'),
    new Product('King Size Master Bedroom', 1450, 10, 'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.', 'images/king-size-master-bedroom.png', 2, 'Bedroom', 'Home / Bedroom / King Size Master Bedroom', 'Bedroom'),
    new Product('Kitchen Cabinet', 1150, 10, 'Habitasse eaque wisi molestie, Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda.', 'images/kitchen-furniture-cabinet.png', 3, 'Cabinet', 'Home / Kitchen / Cabinet / Kitchen Cabinet', 'Cabinet, Kitchen'),
    new Product('Brown Circle Stool', 860, 15, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/furniture-green-fabric-chair.png', 3, 'Cabinet', 'Home / Living Room / Chair / Modern Emerald Fabric Chair', ' Cabinet, Living Room'),
    new Product('Wall Hanging Cabinet', 840, 8, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/wall-hanging-cabinet-.png', 3, 'Cabinet', 'Home / Living Room / Cabinet / Wall Hanging Cabinet', 'Cabinet, Living Room'),
    new Product('White Kitchen Island', 800, 10, 'Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.', 'images/kitchen-island-set.png', 3, 'Kitchen', 'Home / Kitchen / White Kitchen Island', ' Kitchen'),
    new Product('Wooden Bath Room Stool', 220, 15, 'Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.', 'images/wooden-stool.png', 3, ' Bathroom', 'Home / Bathroom / Wooden Bath Room Stool', 'Bathroom'),
    new Product('Wooden Console Table', 120, 8, 'Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.', 'images/wooden-console-table-.png', 2, 'Bedroom', 'Home / Home Office / Wooden Console Table', ' Bedroom, Home Office'),
];

// debugger;
var persons = [
    new Person("Ahmad Esam", "Ahmad.esam1231998@gmail.com", "12345678", "Mahalla-Kubra-qqw", "01015328933", "Admin"),
    new Person("AbdUllah Aiman", "Abdallah_aiman122@gmail.com", "12345678", "Mahalla-Kubra-q11", "01128461703", "Customer"),
    new Person("Bothina Ahmed", "bothina_Ahmed332@gmail.com", "12345678", "Mansoura-qww-www", "01054921533", "Admin"),
    new Person("Sara Mohamed", "sara_M23@gmail.com", `12345678`, "Mansoura-sasa-saqw", "01156897221", "Customer"),
    new Person("Ahmad Mostafa", "AhmedMostafa1221@gmail.com", "12345678", "Fayoum-sass-qwee", "012365992370", "Seller"),
    new Person("Fady Masoud", "FadyM122@gmail.com", "12345678", "Talkha-sad-asq", "01255891102", "Seller")
];
function setLocalStorage()
{
    let users = [];
    for (let i = 0; i < persons.length; i++) {
        users.push(persons[i].getPerson());
    }
    localStorage.setItem("users", JSON.stringify(users));
};
export { products,persons,setLocalStorage};
