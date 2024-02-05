if(localStorage.getItem("messages") == null){
    localStorage.setItem("messages", JSON.stringify([]));
}
if(localStorage.getItem("Active User") == null || JSON.parse(localStorage.getItem("Active User")).role != "Admin"){
    alert("You are not authorized to access this page.")
    window.location.href = "./home.html";
}
let messages = JSON.parse(localStorage.getItem("messages"));

function updateMessages(){
    localStorage.setItem("messages", JSON.stringify(messages));
}
function createTableMessages(){
    let tableHeader = document.getElementById("tableHeader");
    tableHeader.innerHTML = "";
    tableHeader.innerHTML = `
    <tr>
        <th>Message Id</th>
        <th>User Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Subject</th>
        <th>Message Content</th>
        <th>Action</th>
    </tr>
    `;
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    messages.forEach(message => {
        let row = tableBody.insertRow();
        row.innerHTML = `
        <td>${message.MessageId}</td>
        <td>${message.UserId}</td>
        <td>${message.Name}</td>
        <td>${message.Email}</td>
        <td>${message.Subject}</td>
        <td><button type="button" data-bs-toggle="modal" data-bs-target="#messageModal" class="btn btn-primary">View</button></td>
        <td><button class="btn btn-danger">Delete</button></td>
        `;
    });
}
createTableMessages();
document.querySelectorAll('button[data-bs-toggle="modal"]').forEach(button=> button.addEventListener('click', viewMessage));
function viewMessage(e){
    let msgId = this.parentElement.parentElement.children[0].innerText;
    let messageSubject = document.getElementById("messageSubjectRead");
    let messageContent = document.getElementById("messageContentRead");
    // console.log(messageSubject);
    let message = messages.find(msg => msg.MessageId == msgId);
    messageSubject.value = message.Subject;
    messageContent.value = message.MessageContent;
}
document.querySelectorAll('.btn-danger').forEach(button=> button.addEventListener('click', deleteMessage));
function deleteMessage(e){
    if(confirm("Are You Sure, Delete this Message?")){
        let msgId = this.parentElement.parentElement.children[0].innerText;
        messages = messages.filter(msg=> msg.MessageId != msgId);
        updateMessages();
        createTableMessages();
    }
}
