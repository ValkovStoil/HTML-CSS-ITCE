{
  const main = document.getElementsByTagName("main")[0];
  const welcomeUser = document.getElementById("welcome");
  const logoutButton = document.getElementById("logout");
  const playButton = document.getElementById("playe-quizz");

  let usersDataBase;

  if (JSON.parse(localStorage.getItem("usersDataBase")) !== null) {
    usersDataBase = JSON.parse(localStorage.getItem("usersDataBase"));
  } else {
    usersDataBase = [];
  }

  let user = usersDataBase.filter((u) => u.isLoggedIn === true)[0];
  let quizzes = user.quizzes;

  welcomeUser.innerHTML = `Welcome "${user.name}"`;
  console.log(quizzes);

  logoutButton.addEventListener("click", logoutUser);
  playButton.addEventListener("click", playQuiz);

  quizzes.forEach((quizz) => {
    main.append(createStatsForm(quizz));
  });

  function createStatsForm(quizz) {
    const statsContainer = document.createElement("div");
    const categoryName = document.createElement("h1");
    const score = document.createElement("h3");
    const time = document.createElement("h3");
    const passed = document.createElement("h3");

    statsContainer.setAttribute("class", "stats-container");
    categoryName.innerHTML = quizz.gameCategory;
    score.innerHTML = `Score: ${quizz.score}`;
    time.innerHTML = `Time: ${quizz.timePlayed}`;
    passed.innerHTML = `Success: ${quizz.passed}`;

    statsContainer.append(categoryName);
    statsContainer.append(score);
    statsContainer.append(time);
    statsContainer.append(passed);

    return statsContainer;
  }

  function done() {
    return (location.href = "../../index.html");
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

  function playQuiz() {
    done();
  }
}
