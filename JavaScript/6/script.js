const button = document.getElementById("submit");
const radius = document.getElementById("radius");
const volume = document.getElementById("volume")
const form = document.getElementById("MyForm");

button.addEventListener("click", calculate);

function calculate() {
    let vol = (4 / 3) * 3.14 * Math.pow(parseFloat(radius.value), 3)

    volume.value = vol;
}
console.log(vol);