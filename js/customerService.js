// if(JSON.parse(localStorage.getItem("Active User")) == null || JSON.parse(localStorage.getItem("Active User")).role == "Guest"){
//         window.location.href = "./login.html";
// }
if(localStorage.getItem("messages") == null){
    localStorage.setItem("messages", JSON.stringify([]));
}
document.querySelector("#contactUs").addEventListener('click', function(){
    debugger;
    if(JSON.parse(localStorage.getItem("Active User")) == null || JSON.parse(localStorage.getItem("Active User")).role == "Guest"){
        window.location.href = "./login.html";
    }
})
let messages = JSON.parse(localStorage.getItem("messages"));
let activeUser = JSON.parse(localStorage.getItem("Active User"));
// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')
// console.log(forms);
// Loop over them and prevent submission
forms[0].addEventListener('submit', event => {
    // debugger;
    // console.log(this);
    // event.preventDefault()
if (!forms[0].checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
}
else{
    let messageId = getMessageId();
    let userId = activeUser.id;
    let name = activeUser.name;
    let email = activeUser.email;
    let subject = document.querySelector('#subject').value;
    let messageContent = document.querySelector('#messageContent').value;
    let message = {
        MessageId: messageId,
        UserId: userId,
        Name: name,
        Email: email,
        Subject: subject,
        MessageContent: messageContent,
    }
    messages.push(message);
    updateMessages();
    alert("Message sent successfully.");
}
forms[0].classList.add('was-validated')
}, false)
function getMessageId(){
    if(messages.length == 0) return 1;
    return +(messages[messages.length-1].MessageId)+1;
}
function updateMessages(){
    localStorage.setItem("messages", JSON.stringify(messages));
}