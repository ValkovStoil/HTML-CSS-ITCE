function create(words) {
  console.log("TODO:...");

  const contentContainer = document.getElementById("content");

  function createFormTemplate() {
    const div = document.createElement("div");
    const p = document.createElement("p");

    p.style.display = "none";
    div.className = "clickMe";
    div.append(p);

    return div;
  }

  words.forEach(element => {
    let div = createFormTemplate();

    div.firstChild.innerHTML = element;
    contentContainer.append(div);

  });

  const showContentText = Array.from(document.getElementsByClassName("clickMe"));

  showContentText.forEach(e => {
    e.addEventListener("click", function () {
      e.firstChild.style.display = "block"
    });
  });

}