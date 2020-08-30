{
  const nextButton = document.getElementById("nextbtn");
  const doneButton = document.getElementById("donebtn");
  const passwordReset = document.getElementById("psw-container");
  const form = document.getElementsByTagName("form")[0];

  form.addEventListener("click", (event) => {
    event.preventDefault();
  });

  let users;
  let user;

  if (JSON.parse(localStorage.getItem("usersDataBase") !== null)) {
    users = JSON.parse(localStorage.getItem("usersDataBase"));
  } else {
    users = [];
  }

  nextButton.addEventListener("click", checkForUser);
  doneButton.addEventListener("click", changePassword);

  function checkForUser() {
    const userName = document.getElementById("userName");
    if (userName.value !== "") {
      user = users.filter((u) => u.name === userName.value)[0];
    }
    if (user) {
      passwordReset.style.display = "block";
      nextButton.style.display = "none";
      doneButton.style.display = "block";
    } else {
      alert("That user dosn't exist");
    }
  }

  function changePassword() {
    const newPassword = document.getElementById("psw");
    const confirmNewPassword = document.getElementById("psw-repeat");

    if (newPassword.value !== "" && confirmNewPassword.value !== "") {
      if (newPassword.value === confirmNewPassword.value) {
        users.forEach((person) => {
          if (person.name === user.name) {
            person.password = newPassword.value;
            localStorage.setItem("usersDataBase", JSON.stringify(users));
            done();
          }
        });
      } else {
        newPassword.value = "";
        confirmNewPassword.value = "";
        alert("Wrong Password");
      }
    }
  }

  function done() {
    return (location.href = "../htmls/login.html");
  }
}
