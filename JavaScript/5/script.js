const button = document.getElementsByTagName("input")[0];
const trOne = document.getElementsByTagName("tr")[0];
const trTwo = document.getElementsByTagName("tr")[1];

let trCount = document.getElementsByTagName("tr").length;

button.addEventListener("click", () => {
    const tdOne = document.createElement("td");
    const tdTwo = document.createElement("td");

    trCount++;
    tdOne.innerHTML = ` Row${trCount} cell${trCount}`;
    tdTwo.innerHTML = ` Row${trCount} cell${trCount}`;

    trOne.appendChild(tdOne);
    trTwo.appendChild(tdTwo);

});