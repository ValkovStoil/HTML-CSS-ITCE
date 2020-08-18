{
  const ulContainer = document.getElementById("recipe-container");

  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((data) => data.json())
    .then((response) => {
      //idCategory strCategory strCategoryDescription strCategoryThumb

      response.categories.forEach((element) => {
        // let mealId = element.idCategory;
        let mealName = element.strCategory;
        // let mealDescription = element.strCategoryDescription;
        let mealPic = element.strCategoryThumb;

        let recipe = createRecipeForm(mealName, mealPic);
        ulContainer.append(recipe);
      });
    });

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
    a.setAttribute("href", `./assets/htmls/${name.toLowerCase()}.html`);
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
