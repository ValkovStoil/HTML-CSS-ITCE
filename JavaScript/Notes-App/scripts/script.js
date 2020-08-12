{
  const spanIconChange = document.getElementsByClassName("sc-bdVaJa")[0];
  const body = document.getElementsByTagName("body")[0];
  const addButton = document.getElementById("add-note");
  const noteHeaderElement = document.getElementsByClassName("note-header");
  const noteTopDiv = document.getElementsByClassName("hRXaNY");
  const divContainer = document.getElementsByClassName("htOnTI");
  const mainContainer = document.getElementById("main");

  spanIconChange.addEventListener("click", toggle);

  let themeState = JSON.parse(localStorage.getItem("dark"));

  //create notes if there is a data in the localStorage
  let storeElementData = JSON.parse(localStorage.getItem("storedData"));
  if (storeElementData === null) {
    storeElementData = [];
  } else {
    storeElementData.forEach((element) => {
      let date = element.date;
      let greeting = element.greeting;
      let context = element.context;

      createNoteElement(date, greeting, context);
    });
  }

  //#region  Helping functions

  function changeBackgroundColor(nodeElement, color) {
    Array.from(nodeElement).forEach((element) => {
      element.style.backgroundColor = color;
    });
  }

  function changeColor(nodeElement, color) {
    Array.from(nodeElement).forEach((element) => {
      element.style.color = color;
    });
  }

  function changeTextColor(nodeElement, color) {
    Array.from(nodeElement).forEach((element) => {
      element.firstChild.style.color = color;
    });
  }
  function changeBorderColor(nodeElement, color) {
    Array.from(nodeElement).forEach((element) => {
      element.style.borderColor = color;
    });
  }

  //Set color on the last Created element
  function setColor() {
    let color;

    if (body.style.backgroundColor === "rgb(248, 248, 249)") {
      color = "#161617";

      divContainer[divContainer.length - 1].style.borderColor = color;
      noteHeaderElement[noteHeaderElement.length - 1].style.color = color;
      noteTopDiv[noteTopDiv.length - 1].style.backgroundColor = color;
      noteTopDiv[noteTopDiv.length - 1].firstChild.style.color = "#F8F8F9";
    } else {
      color = "#FFFFFF";

      divContainer[divContainer.length - 1].style.borderColor = color;
      noteHeaderElement[noteHeaderElement.length - 1].style.color = color;
      noteTopDiv[noteTopDiv.length - 1].style.backgroundColor = color;
      noteTopDiv[noteTopDiv.length - 1].firstChild.style.color = "#161617";
    }
  }

  function checkBodyBackgroundColor() {
    return body.style.backgroundColor === "rgb(248, 248, 249)";
  }

  //create span elements with icons for delete and edite buttons
  function createIconSpan(lable, icon) {
    const spanElement = document.createElement("span");
    spanElement.setAttribute("role", "img");
    spanElement.setAttribute("aria-label", `${lable}`);
    spanElement.setAttribute("class", "sc-bdVaJa fVCJpx");

    if (lable === "edit") {
      spanElement.setAttribute("onclick", "edit(event)");
    } else {
      spanElement.setAttribute("onclick", "del(event)");
    }
    spanElement.innerHTML = icon;

    return spanElement;
  }

  //create note element and append it in to the HTML
  function createNoteElement(date, greeting, context) {
    const topDivElement = document.createElement("div");
    const middleDivElement = document.createElement("div");
    const midSpanElement = document.createElement("span");
    const bottomDivElement = document.createElement("div");
    const hOneElement = document.createElement("h1");
    const preElement = document.createElement("pre");
    const divIconnContainer = document.createElement("div");
    const codeElement = document.createElement("code");

    topDivElement.setAttribute("class", "sc-htpNat htOnTI");
    middleDivElement.setAttribute("class", "sc-bxivhb hRXaNY");

    midSpanElement.innerHTML = date;

    let iconSpanElementOne = createIconSpan("edit", "✍️");
    let iconSpanElementTwo = createIconSpan("delete", "🗑️");

    divIconnContainer.appendChild(iconSpanElementOne);
    divIconnContainer.appendChild(iconSpanElementTwo);

    middleDivElement.appendChild(midSpanElement);
    middleDivElement.appendChild(divIconnContainer);

    //Bottom Div Element
    bottomDivElement.setAttribute("class", "sc-ifAKCX fIKiaj");
    hOneElement.setAttribute("class", "note-header");
    hOneElement.innerHTML = greeting;
    codeElement.innerHTML = context;
    preElement.appendChild(codeElement);
    bottomDivElement.appendChild(hOneElement);
    bottomDivElement.appendChild(preElement);

    topDivElement.appendChild(middleDivElement);
    topDivElement.appendChild(bottomDivElement);

    mainContainer.appendChild(topDivElement);

    let isDark = checkBodyBackgroundColor();
    setColor(isDark);
  }

  //#endregion

  //#region  Change theme color
  function setTheme(isDark) {
    let color;
    if (isDark) {
      color = "#FFFFFF";
      body.style.backgroundColor = "#161617";
      spanIconChange.innerHTML = "🌞";
      spanIconChange.parentElement.style.color = "#FFFFFF";
      addButton.style.backgroundColor = "#161617";
      addButton.style.color = color;

      changeBorderColor(divContainer, color);
      changeColor(noteHeaderElement, color);
      changeBackgroundColor(noteTopDiv, color);
      changeTextColor(noteTopDiv, "#161617");
    } else {
      color = "#161617";
      body.style.backgroundColor = "#F8F8F9";
      spanIconChange.innerHTML = "🌙";
      spanIconChange.parentElement.style.color = color;
      addButton.style.backgroundColor = "#F8F8F9";
      addButton.style.color = color;

      changeBorderColor(divContainer, color);
      changeColor(noteHeaderElement, color);
      changeBackgroundColor(noteTopDiv, color);
      changeTextColor(noteTopDiv, "#F8F8F9");
    }
  }

  setTheme(themeState);

  function toggle() {
    let dark = !JSON.parse(localStorage.getItem("dark"));

    setTheme(dark);

    localStorage.setItem("dark", `${dark}`);
  }

  //#endregion

  //#region  Add Button
  //Add Button onclick here
  addButton.addEventListener("click", addEvent);

  function addEvent() {
    let currentData = new Date();
    let monthDayYear = currentData.toLocaleString().split(",")[0];
    let time = currentData.toLocaleString().split(",")[1];
    let date = `Time: ${time} Day: ${monthDayYear}`;
    let greeting = "Hello World";
    let context = `const text="Hello"`;

    createNoteElement(date, greeting, context);

    //add note info to localStorage
    let noteInfo = {
      date: `Time: ${time} Day: ${monthDayYear}`,
      greeting: greeting,
      context: context,
    };

    storeElementData.push(noteInfo);
    localStorage.setItem("storedData", JSON.stringify(storeElementData));
  }

  //#endregion

  //#region  Remove Button

  function del(e) {
    let removeFromLocalStorage =
      e.target.parentElement.previousSibling.innerHTML;

    let removeFromHTML = e.target.parentElement;
    while (removeFromHTML.className !== "sc-htpNat htOnTI") {
      removeFromHTML = removeFromHTML.parentElement;
    }

    removeFromHTML.remove();

    storeElementData = storeElementData.filter(
      (e) => e.date !== removeFromLocalStorage
    );

    if (storeElementData.length === 1 && storeElementData[0] === false) {
      storeElementData = [];
    }
    localStorage.setItem("storedData", JSON.stringify(storeElementData));
  }

  //#endregion

  //#region  Edit Button
  function edit(e) {
    let spanIconChange = e.target.innerHTML;
    const hOneElement = document.createElement("h1");
    const preElement = document.createElement("pre");
    const codeElement = document.createElement("code");
    const divElement = document.createElement("div");
    const textArea = document.createElement("TEXTAREA");

    const dataOfTheForm = e.target.parentElement.previousSibling.innerHTML;

    hOneElement.setAttribute("class", "note-header");
    divElement.setAttribute("class", "sc-ifAKCX fIKiaj");
    textArea.setAttribute("id", "text-area");

    let container = e.target.parentElement;
    while (container.className !== "sc-htpNat htOnTI") {
      container = container.parentElement;
    }

    if (spanIconChange === "✍️") {
      e.target.innerHTML = "👌";
      let originalForm = e.target.parentElement.parentElement.nextSibling;
      let isDark = checkBodyBackgroundColor();
      let h1 = originalForm.firstChild;
      let code = h1.nextSibling.firstChild;

      if (isDark) {
        textArea.style.backgroundColor = "#161617";
        textArea.style.color = "#FFFFFF";
      }

      textArea.value = `# ${h1.innerHTML}  \n\n\r \`\`\` ${code.innerHTML}`;
      container.removeChild(originalForm);
      container.appendChild(textArea);
    } else {
      e.target.innerHTML = "✍️";

      let newTextArray = [];
      let textInTextArea = document
        .getElementById("text-area")
        .value.split("```");

      textInTextArea.forEach((element) => {
        newTextArray.push(element.replace(/(\r\n|\n|\r|#)/gm, "").trim());
      });

      //TODO remove text area and replace the new info
      hOneElement.innerHTML = newTextArray[0];
      codeElement.innerHTML = newTextArray[1];

      preElement.append(codeElement);
      divElement.append(hOneElement);
      divElement.append(preElement);

      container.removeChild(container.lastChild);
      container.append(divElement);

      let noteInfo = {
        date: `${dataOfTheForm}`,
        greeting: newTextArray[0],
        context: newTextArray[1],
      };

      for (let i = 0; i < storeElementData.length; i++) {
        if (storeElementData[i].date === dataOfTheForm) {
          storeElementData[i] = noteInfo;
        }
      }

      localStorage.setItem("storedData", JSON.stringify(storeElementData));
    }
  }

  //#endregion
}
