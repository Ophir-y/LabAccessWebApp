let loginUserID = prompt("To log in Enter Username");

let loginUserPass = prompt("Enter Password");

const div = document.querySelector("#mainDiv");

const header = document.createElement("h2");
header.innerText = `${loginUserID}`;
const header2 = document.createElement("h2");
header2.innerText = `${loginUserPass}`;
div.appendChild(header);
div.appendChild(header2);
