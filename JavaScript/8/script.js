const container = document.getElementById("exercise");
const paragraphElements = document.getElementById("input").innerHTML.split(".");

const formatButton = document.getElementById("formatItBtn");

formatButton.addEventListener("click", textFormater);

function textFormater() {
  function format(elements) {
    for (let index = 0; index < elements.length; index++) {
      const p = document.createElement("p");
      p.innerHTML = `${elements[index]}.`;
      container.appendChild(p);
    }
  }
  format(paragraphElements);
  document.getElementById("input").remove();
}