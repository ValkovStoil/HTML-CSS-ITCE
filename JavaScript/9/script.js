const bodyElement = document.body;
const buttonOne = document.getElementById("btn1");
const buttonTwo = document.getElementById("btn2");
const buttonThree = document.getElementById("btn3");

// bodyElement.style.backgroundColor = "rgb(255, 12, 255)";

buttonOne.addEventListener("click", colorChange);
buttonTwo.addEventListener("click", colorChange);
buttonThree.addEventListener("click", colorChange);

const buttons = [buttonOne, buttonTwo, buttonThree];

function randomButton() {
  return Math.floor(Math.random() * 3);
}

function colorChange() {

  let buttonCheck = this.getAttribute('id');
  let button = document.getElementById(buttonCheck);

  let color = "";

  function pickRandomColor() {
    let colorNumbers = [];

    for (let i = 0; i < 3; i++) {
      colorNumbers.push(Math.floor(Math.random() * 256))
    }

    return color = `rgb(${colorNumbers.join(", ")})`;
  }

  function changeBackgroundColor() {
    pickRandomColor();
    bodyElement.style.backgroundColor = color;
  }

  function chnageButtonColor() {
    pickRandomColor();
    button.style.backgroundColor = color;
  }

  function changeButtonTextColor() {
    pickRandomColor();
    button.style.color = color;
  }

  function lockButton() {
    let buttonIndex = randomButton();
    let randomBtn = buttons[buttonIndex];

    randomBtn.disabled = false;

    console.log(randomBtn);
    for (let i = 0; i < buttons.length; i++) {
      if (randomBtn.id !== buttons[i].id) {
        buttons[i].disabled = true;
      }

    }

  }

  lockButton();
  changeBackgroundColor();
  chnageButtonColor();
  changeButtonTextColor();
}