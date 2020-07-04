const articles = document.getElementById("articles");
const button = document.getElementsByTagName("button")[0];

button.addEventListener("click", addArticles);

function addArticles() {
  let article = document.createElement("article");
  let title = document.createElement("h3");
  let content = document.createElement("p");
  let titleInput = document.getElementById("createTitle");
  let contentInput = document.getElementById("createContent");

  title.innerHTML = titleInput.value;
  content.innerHTML = contentInput.value;
  article.appendChild(title);
  article.appendChild(content);

  articles.appendChild(article);
}
