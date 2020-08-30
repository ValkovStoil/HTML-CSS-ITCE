{
  const registerButton = document.getElementById("registerbtn");

  registerButton.addEventListener("click", registerUser);

  function done() {
    return (location.href = "../../index.html");
  }

  function registerUser() {
    const userNameInput = document.getElementById("userName");
    const passwordInput = document.getElementById("psw");
    const repeatPasswordInput = document.getElementById("psw-repeat");

    if (
      userNameInput.value === "" ||
      passwordInput.value === "" ||
      repeatPasswordInput.value === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (passwordInput.value !== repeatPasswordInput.value) {
      passwordInput.value = "";
      repeatPasswordInput.value = "";
      alert("Wrong passowrd or Confirm passowrd");
      return;
    }

    let users;

    if (JSON.parse(localStorage.getItem("usersDataBase")) !== null) {
      users = JSON.parse(localStorage.getItem("usersDataBase"));
    } else {
      users = [];
    }

    //Check if we already have a user with that name
    const alreadyExist = users.some((u) => u.name === userNameInput.value);

    if (alreadyExist) {
      alert("That user already exist");
      userNameInput.value = "";
      passwordInput.value = "";
      repeatPasswordInput.value = "";
    } else {
      let user = createUser(userNameInput.value, passwordInput.value);
      users.push(user);
      localStorage.setItem("usersDataBase", JSON.stringify(users));
      done();
    }
  }

  function createUser(name, password) {
    let user = {
      name: name,
      password: password,
      quizzes: [],
      isLoggedIn: true,
    };

    return user;
  }
}
