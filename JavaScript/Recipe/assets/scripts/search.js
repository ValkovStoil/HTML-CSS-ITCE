{
  //TODO
  //#region Search
  const bodyContainer = document.getElementById("body-container");
  const searchButton = document.getElementById("search-button");
  const searchValue = document.getElementById("search-box");
  const searchContantainer = document.getElementById("search-container");
  const ulContainer = document.getElementById("recipe-container");
  const addButton = document.getElementById("add-recipe");
  const backButton = document.getElementById("back");
  const mealTitle = document.getElementById("title");

  searchButton.addEventListener("click", searchRecipe);
  searchValue.addEventListener("select", searchWithEnter);

  function searchWithEnter(event) {
    if (event.keyCode == 13 && searchValue.value !== "") {
      searchRecipe();
      searchValue.blur();
    }
  }
  let recipeName;
  function searchRecipe() {
    bodyContainer.lastChild.remove();
    recipeName = searchValue.value;
    mealTitle.innerHTML = "Search";
    searchContantainer.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
      .then((data) => data.json())
      .then((response) => foundIt(response.meals));

    ulContainer.style.display = "none";
    searchContantainer.style.display = "flex";
    addButton.style.display = "none";
    backButton.style.display = "block";

    searchValue.value = "";
  }

  function foundIt(recipes) {
    if (recipes !== null) {
      recipes.forEach((element) => {
        let name = element.strMeal;
        let img = element.strMealThumb;

        searchContantainer.append(createRecipeForm(name, img));
      });
    } else {
      let span = document.createElement("span");

      span.style.fontSize = "30px";
      span.innerHTML = `Sorry we don't have recipe with name "${recipeName}".`;
      searchContantainer.append(span);
    }
  }
  //#endregion

  //Display the input form for adding the new recipe hide the add button and the list of recipes

  //#region  Create form for recipe vew
  function createRecipeForm(name, image) {
    const recipe = document.createElement("div");
    const pic = document.createElement("div");
    const title = document.createElement("div");
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");

    let url = image;
    let alt = name;

    recipe.setAttribute("class", "recipe");
    a.setAttribute("onclick", "showRecipe(event)");
    pic.setAttribute("class", "pic");
    title.setAttribute("class", "title");
    img.setAttribute("src", url);
    img.setAttribute("alt", alt);

    title.innerHTML = name;
    pic.append(img);
    a.append(pic);
    a.append(title);
    li.append(a);
    recipe.append(li);

    return recipe;
  }
}
