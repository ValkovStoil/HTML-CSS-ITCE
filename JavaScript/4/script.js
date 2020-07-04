const ph = document.getElementById("text");
const button = document.getElementById("jsstyle");

button.addEventListener("click", changeAttributes);

function changeAttributes() {
    ph.style.fontSize = "50px";
    ph.style.fontFamily = "Impact,Charcoal,sans-serif";
    ph.style.color = "rgb(210, 102, 102)";
    ph.style.border = "5px solid green";
    ph.style.borderRadius = "10px";
}