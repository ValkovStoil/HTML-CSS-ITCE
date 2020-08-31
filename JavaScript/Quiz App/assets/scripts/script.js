{
  const queizContainer = document.getElementById("quiz-container");
  const loginButton = document.getElementById("login");
  const registerButton = document.getElementById("register");
  const logoutButton = document.getElementById("logout");
  const profileButton = document.getElementById("profile");
  const playAgainButton = document.getElementById("play-again");
  const loginMessage = document.getElementById("loginMessage");
  const categoriesForm = document.getElementById("category-container");
  const category = document.getElementById("categories");
  const startGameButton = document.getElementById("start-game");
  const nextQuestionButton = document.getElementById("next");
  const listOfAnswers = document.getElementsByClassName("answer");
  const scoreContainer = document.getElementById("score-container");
  const showCategory = document.getElementById("category");

  // const form = document.getElementsByTagName("form")[0];
  // form.addEventListener("click", (event) => {
  //   event.preventDefault();
  // });

  logoutButton.addEventListener("click", logoutUser);
  startGameButton.addEventListener("click", startGame);
  profileButton.addEventListener("click", showProfile);
  playAgainButton.addEventListener("click", playAgain);

  let animalsUrl =
    "https://opentdb.com/api.php?amount=10&category=27&type=multiple";
  let animeMangaUrl =
    "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple";
  let videGamesUrl =
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple";
  let compitersUrl =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

  let usersDataBase;
  let selectedAnswers = [];

  if (JSON.parse(localStorage.getItem("usersDataBase")) !== null) {
    usersDataBase = JSON.parse(localStorage.getItem("usersDataBase"));
  } else {
    usersDataBase = [];
  }

  function done() {
    return (location.href = "../../index.html");
  }

  function showProfile() {
    return (location.href = "/assets/htmls/profile.html");
  }

  function playAgain() {
    return (location.href = "/index.html");
  }

  let currentCategory = "";
  let startTime = 0;
  let endTime = 0;
  let user = usersDataBase.filter((u) => u.isLoggedIn === true)[0];

  console.log(user);
  if (user) {
    loginButton.style.display = "none";
    registerButton.style.display = "none";
    logoutButton.style.display = "block";
    profileButton.style.display = "block";
    loginMessage.style.display = "none";
    categoriesForm.style.display = "block";

    document.getElementById(
      "welcome"
    ).innerHTML = `Welcome to my Quiz game! "${user.name}"`;
  }

  function changeListColors() {
    for (let i = 0; i < listOfAnswers.length; i++) {
      listOfAnswers[i].removeAttribute("title");
      listOfAnswers[i].style.color = "rgb(66, 246, 255)";
      listOfAnswers[i].style.background = "blue";
      listOfAnswers[i].childNodes[1].firstChild.style.background = "blue";
    }
  }

  function select(event) {
    let answer = this.event.target;

    changeListColors();
    answer.parentElement.setAttribute("title", "clicked");

    if (answer.parentElement.getAttribute("title")) {
      answer.parentElement.style.background = "#ffbf00";
      answer.parentElement.style.color = "blue";
      answer.previousSibling.firstChild.style.background = "#ffbf00";
    }
  }

  function startGame() {
    startTime = Date.now();
    currentCategory = category.options[category.selectedIndex].innerHTML;
    categoriesForm.style.display = "none";
    queizContainer.style.display = "block";
    gameBegin(currentCategory);
  }

  function gameBegin(chosenCategory) {
    let questionsUrl = "";

    switch (chosenCategory) {
      case "Animals":
        questionsUrl = animalsUrl;
        break;
      case "Japanese Anime and Manga":
        questionsUrl = animeMangaUrl;
        break;
      case "Video Games":
        questionsUrl = videGamesUrl;
        break;
      case "Computers":
        questionsUrl = compitersUrl;
        break;
    }
    fetch(questionsUrl)
      .then((data) => data.json())
      .then((response) => showQuestions(response));
  }

  let correctAnswers = [];
  function showQuestions(category) {
    let categoryName = category.results[0].category;

    nextQuestionButton.addEventListener("click", showNextQuestion);

    let questionsCollection = category.results;
    showCategory.innerHTML = `${categoryName}`;

    let questionCount = 1;
    showQiestion(questionsCollection.shift(), questionCount);

    function showNextQuestion() {
      let givenAnswer = Array.from(listOfAnswers).filter((a) =>
        a.hasAttribute("title")
      );

      if (questionsCollection.length > 0 && givenAnswer.length > 0) {
        questionCount++;
        let currentAnswer =
          givenAnswer[0].firstChild.nextSibling.nextSibling.innerHTML;
        selectedAnswers.push(currentAnswer);
        showQiestion(questionsCollection.shift(), questionCount);
      } else if (questionsCollection.length === 0) {
        let currentAnswer =
          givenAnswer[0].firstChild.nextSibling.nextSibling.innerHTML;
        selectedAnswers.push(currentAnswer);
        showResults(selectedAnswers);
      }

      if (questionCount === 10) {
        nextQuestionButton.innerHTML = "Done";
      }

      changeListColors();
    }
  }

  function showResults(userAnswers) {
    endTime = Date.now();
    const gameCategory = document.getElementById("category-name");
    const gameScore = document.getElementById("score");
    const gameTimePlayed = document.getElementById("time-played");
    const gameSuccess = document.getElementById("success");

    categoriesForm.style.display = "none";
    scoreContainer.style.display = "block";

    let userNameField = scoreContainer.children.item(0);
    let stats = 0;
    let minutes = new Date(endTime - startTime).getMinutes();
    let seconds = new Date(endTime - startTime).getSeconds();

    correctAnswers.forEach((answer) => {
      if (userAnswers.includes(answer)) {
        stats++;
      }
    });

    let success = "No";
    if (stats >= 5) {
      gameSuccess.innerHTML = "Success";
      success = "Yes";
    } else {
      gameSuccess.innerHTML = "Better luck next time";
    }

    let quizz = {
      gameCategory: `${currentCategory}`,
      score: `${stats}/10`,
      timePlayed: `${minutes}:${seconds}m`,
      passed: `${success}`,
    };

    gameCategory.innerHTML = `Category: ${currentCategory}`;
    userNameField.innerHTML = `${user.name}`;
    gameScore.innerHTML = `Correct Answers: ${stats}/10`;
    gameTimePlayed.innerHTML = `Time: ${minutes}:${seconds}m`;

    queizContainer.style.display = "none";

    let userQuizzs = user.quizzes;
    let foundIt = false;

    if (userQuizzs.length !== 0) {
      userQuizzs.forEach((element) => {
        if (element.gameCategory === quizz.gameCategory) {
          foundIt = true;
        }
      });
    } else {
      userQuizzs.push(quizz);
      updatingUserDataBase(user);
      return;
    }

    if (foundIt) {
      for (let i = 0; i < userQuizzs.length; i++) {
        if (userQuizzs[i].gameCategory === quizz.gameCategory) {
          userQuizzs[i] = quizz;
        }
      }
    } else {
      userQuizzs.push(quizz);
    }
    updatingUserDataBase(user);

    console.log(usersDataBase);
  }

  function updatingUserDataBase(player) {
    for (const user in usersDataBase) {
      if (user.name === player.name) {
        user = player;
      }
    }

    localStorage.setItem("usersDataBase", JSON.stringify(usersDataBase));
  }

  function showQiestion(questionObject, questionCount) {
    const answers = document.getElementsByClassName("choice");
    const question = document.getElementById("question");

    let incorectAnswers = questionObject.incorrect_answers;
    let correctAnswer = questionObject.correct_answer;
    correctAnswers.push(correctAnswer);

    let correctAnswerPlace = getRandomInt(answers.length);
    answers[correctAnswerPlace].innerHTML = correctAnswer;

    for (const answer in answers) {
      if (answers[answer].innerHTML !== `${correctAnswer}`) {
        answers[answer].innerHTML = `${incorectAnswers.shift()}`;
      }
    }

    question.innerHTML = `${questionCount}. ${questionObject.question}`;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function logoutUser() {
    if (confirm("Are you sure want to Logout?")) {
      usersDataBase.map((u) => {
        if (u.isLoggedIn === true) {
          u.isLoggedIn = false;
        }
      });
      localStorage.setItem("usersDataBase", JSON.stringify(usersDataBase));

      done();
    }
  }
}
