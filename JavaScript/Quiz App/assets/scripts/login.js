{
  const loginButton = document.getElementById("login");
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");

  loginButton.addEventListener("click", loginUser);

  function done() {
    return (location.href = "../../index.html");
  }

  function loginUser() {
    let users;

    if (userName.value === "" || password.value === "") {
      password.value = "";
      alert("Please fill in all fields");
      return;
    }

    if (JSON.parse(localStorage.getItem("usersDataBase")) !== null) {
      users = JSON.parse(localStorage.getItem("usersDataBase"));
    } else {
      users = [];
    }

    let user = users.filter((u) => u.name === userName.value)[0];
    if (user) {
      //check if the input password is the same
      if (user.password === password.value) {
        const form = document.getElementsByTagName("form")[0];

        form.addEventListener("click", (event) => {
          event.preventDefault();
        });

        //change the isLoggedIn to true
        users.forEach((person) => {
          if (person.name === userName.value) {
            person.isLoggedIn = true;
            localStorage.setItem("usersDataBase", JSON.stringify(users));
            done();
          }
        });
      } else {
        password.value = "";
        alert("Wrong password or user name");
      }
    } else {
      password.value = "";
      alert("Wrong password or user name");
    }
  }
}
