const form = document.getElementById("form1");
const myButton = form.lastElementChild;

const names = document.getElementsByTagName("input");
const firstName = names[0].value;
const lastName = names[1].value;


const span = document.createElement('span');
span.innerHTML = ` First name: ${firstName}, Last Name: ${lastName}`;
document.body.appendChild(span);