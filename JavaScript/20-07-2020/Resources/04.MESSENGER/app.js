function attachEvents() {
  let submitButton = document.getElementById("submit");
  let refreshButton = document.getElementById("refresh");
  let authroName = document.getElementById("author");
  let messageContent = document.getElementById("content");
  let messageArea = document.getElementById("messages");

  submitButton.addEventListener("click", sedtDataToServer);
  refreshButton.addEventListener("click", getDataFromServer);

  function sedtDataToServer() {
    if (authroName.length !== 0 && messageContent.length !== 0) {
      fetch("http://localhost:8000/messenger", {
        method: "POST",
        body: JSON.stringify({
          author: authroName.value,
          content: messageContent.value,
        }),
      });
    }
    authroName.value = "";
    messageContent.value = "";
  }

  function getDataFromServer() {
    messageArea.innerHTML = "";
    fetch("http://localhost:8000/messenger")
      .then((data) => data.json())
      .then((response) => {
        for (const chatInfo in response) {
          let name = response[chatInfo].author;
          let msg = response[chatInfo].content;
          messageArea.append(`${name}: ${msg} \n`);
        }
      });
  }
}

attachEvents();
