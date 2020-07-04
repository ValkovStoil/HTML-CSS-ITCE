const myButton = document.getElementsByTagName("button")[0];

myButton.addEventListener("click", changeColors);

let p1 = document.getElementsByTagName("p")[0];
let p2 = document.getElementsByTagName("p")[1];

function changeColors() {
    p1.style.backgroundColor = "green";
    p2.style.backgroundColor = "red";
}