const navBar = document.querySelector("nav"),
  menuBtns = document.querySelectorAll(".menu-icon"),
  overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
});

overlay.addEventListener("click", () => {
  navBar.classList.remove("open");
});


//chat 
const socket = io();

console.log('this works')

$("#chatForm").submit(() => {
  let text = $("#chat-input").val(),
    userName = $("chat-user-name").val(),
    userId = $("chat-user-id").val();
  socket.emit("message", {
    content: text,
    userName: userName,
    userId: userId
  });
  $("#chat-input").val("");
  return false;
});

socket.on("load all messages", (data) => {
  data.forEach(message => {
    displayMessage(message);
  })
});

let displayMessage = (message) => {
  $("#chat").prepend(
    $("<li>").html(
      '<strong class = "message ${getCurrentUserClass(message.user)}"> ${message.userName} </strong>: ${message.content}'
    ));
};
