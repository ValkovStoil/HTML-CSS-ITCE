{
  const bodyContainer = document.getElementById("body-container");
  const ulContainer = document.getElementById("recipe-container");
  const searchContantainer = document.getElementById("search-container");
  const addButton = document.getElementById("add-recipe");
  const backButton = document.getElementById("back");
  const mealTitle = document.getElementById("title").innerHTML;

  let favoriteRecipes = JSON.parse(localStorage.getItem("recipes"));
  if (favoriteRecipes === null) {
    favoriteRecipes = [];
  }

  addButton.addEventListener("click", addRecipe);
  backButton.addEventListener("click", goBackToRecipes);

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealTitle}`)
    .then((data) => data.json())
    .then((response) => {
      response.meals.forEach((element) => {
        let mealName = element.strMeal;
        let mealPic = element.strMealThumb;
        let recipe = createRecipeForm(mealName, mealPic);
        ulContainer.append(recipe);
      });
    });

  fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then((data) => data.json())
    .then((response) => {
      // console.log(response);
    });

  let addRecipeForm = createAddRecipeForm();
  //Display the input form for adding the new recipe hide the add button and the list of recipes
  function addRecipe() {
    ulContainer.style.display = "none";
    addButton.style.display = "none";
    bodyContainer.append(addRecipeForm);
  }

  function goBackToRecipes() {
    let title = document.getElementsByTagName("title")[0].innerHTML;

    document.getElementById("title").innerHTML = title;
    ulContainer.style.display = "flex";
    addButton.style.display = "block";
    backButton.style.display = "none";
    searchContantainer.style.display = "none";
    searchContantainer.innerHTML = "";

    bodyContainer.lastChild.remove();
  }

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
  //#endregion

  //#region show Recipe card

  function showRecipe(event) {
    let dishName = event.srcElement.alt;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`)
      .then((data) => data.json())
      .then((response) => {
        let mealId = response.meals[0];
        bodyContainer.append(createRecipeCard(mealId));
      });
    ulContainer.style.display = "none";
    searchContantainer.style.display = "none";
    addButton.style.display = "none";
    backButton.style.display = "block";
  }

  function createRecipeCard(meal) {
    let dish = document.createElement("div");
    let img = document.createElement("img");
    let topUl = document.createElement("ul");
    let ingradients = document.createElement("p");
    let nameOfTheDish = document.createElement("span");
    let preparationSteps = document.createElement("div");
    let bottomUl = document.createElement("ul");
    let instructions = document.createElement("p");
    let saveButton = document.createElement("button");

    let instructionArray = meal.strInstructions.split("\r\n");
    let pic = meal.strMealThumb;
    let name = meal.strMeal;
    let ingradientsArray = [];

    for (const ingradient in meal) {
      if (ingradient.startsWith("strIngredient") && meal[ingradient] !== "") {
        ingradientsArray.push(meal[ingradient]);
      }
    }

    dish.setAttribute("id", "dish");
    img.setAttribute("src", pic);
    img.setAttribute("alt", name);
    topUl.setAttribute("id", "igradients");
    preparationSteps.setAttribute("id", "preparation-steps");
    saveButton.setAttribute("id", "save");
    saveButton.setAttribute("onclick", "saveRecipe(event)");

    ingradients.innerHTML = "Igradients";
    instructions.innerHTML = "Instructions";
    saveButton.innerHTML = "Save";
    nameOfTheDish.innerHTML = name;

    topUl.append(ingradients);

    addListElements(topUl, ingradientsArray);
    bottomUl.append(instructions);

    addListElements(bottomUl, instructionArray);
    preparationSteps.append(bottomUl);

    dish.append(img);
    dish.append(topUl);
    dish.append(nameOfTheDish);
    dish.appendChild(preparationSteps);

    function addListElements(ul, a) {
      a.forEach((element) => {
        let li = document.createElement("li");
        li.innerHTML = element;
        ul.append(li);
      });
    }
    dish.appendChild(saveButton);

    return dish;
  }

  function saveRecipe(event) {
    let nameOfTheRecipe =
      event.target.previousSibling.previousSibling.firstChild.textContent;
    let alreadyHaveIt = true;

    favoriteRecipes.forEach((recipe) => {
      if (nameOfTheRecipe === recipe) {
        alreadyHaveIt = false;
      }
    });

    if (alreadyHaveIt) {
      favoriteRecipes.push(nameOfTheRecipe);
      localStorage.setItem("recipes", JSON.stringify(favoriteRecipes));
    }
  }
  //#endregion

  //#region Create form for recipe add

  function createAddRecipeForm() {
    const addRecipeFormElement = document.createElement("div");
    const headerElement = document.createElement("header");
    const pElement = document.createElement("p");
    const iElementOne = document.createElement("i");
    const iElementTwo = document.createElement("i");
    const spanElement = document.createElement("span");
    const mainElement = document.createElement("main");
    const inputTitleElement = document.createElement("input");
    const inputSourceElement = document.createElement("input");
    const inputPictureElement = document.createElement("input");
    const inputIngradientsElement = document.createElement("input");
    const footerElement = document.createElement("footer");
    const footerPElement = document.createElement("p");
    const buttonElement = document.createElement("button");

    addRecipeFormElement.setAttribute("id", "add-recipe-form");
    headerElement.setAttribute("class", "header");
    iElementOne.setAttribute("class", "fa fa-cutlery");
    iElementTwo.setAttribute("class", "fa fa-spoon");
    mainElement.setAttribute("id", "add-info");
    inputTitleElement.setAttribute("type", "text");
    inputTitleElement.setAttribute("placeholder", "recipe title");
    inputSourceElement.setAttribute("type", "text");
    inputSourceElement.setAttribute("placeholder", "recipe source");
    inputPictureElement.setAttribute("type", "text");
    inputPictureElement.setAttribute("placeholder", "recipe picture");
    inputIngradientsElement.setAttribute("type", "text");
    inputIngradientsElement.setAttribute(
      "placeholder",
      "enter ingredients, separated by comma"
    );
    footerElement.setAttribute("class", "footer");
    buttonElement.setAttribute("class", "add");
    buttonElement.setAttribute("onclick", "addTheRecipe()");
    buttonElement.innerHTML = "ADD RECIPE";

    pElement.append(iElementOne);
    pElement.append(spanElement);
    pElement.append(iElementTwo);
    headerElement.append(pElement);

    mainElement.append(inputTitleElement);
    mainElement.append(inputSourceElement);
    mainElement.append(inputPictureElement);
    mainElement.append(inputIngradientsElement);

    footerPElement.append(iElementOne);
    footerPElement.append(buttonElement);
    footerPElement.append(iElementTwo);
    footerElement.append(footerPElement);

    addRecipeFormElement.append(headerElement);
    addRecipeFormElement.append(mainElement);
    addRecipeFormElement.append(footerElement);

    return addRecipeFormElement;
  }
  //#endregion

  //TODO
  function addTheRecipe() {
    let h1 = document.createElement("h1");
    h1.innerHTML = "Sorry this feature is in progress";
    addRecipeForm.remove();
    bodyContainer.append(h1);

    setTimeout(function () {
      h1.remove();
      ulContainer.style.display = "flex";
      addButton.style.display = "block";
    }, 2000);
  }
}
