function attachEvents() {
  const load = document.getElementById("btnLoad");
  const create = document.getElementById("btnCreate");
  const phonebook = document.getElementById("phonebook");

  load.addEventListener("click", loadData);
  create.addEventListener("click", createData);

  function loadThePhoneBook() {
    phonebook.innerHTML = "";
    fetch(`http://localhost:8000/phonebook`)
      .then((data) => data.json())
      .then((response) => {
        for (const key in response) {
          let personName = response[key].person;
          let personPhone = response[key].phone;

          let button = document.createElement("button");
          button.innerHTML = "Delete";
          button.onclick = function () {
            deleteContact(event);
          };

          let li = document.createElement("li");
          li.id = `${key}`;
          li.innerHTML = `${personName}: ${personPhone} `;
          li.append(button);
          phonebook.append(li);
        }
      })
      .catch((error) => {
        console.log("click");
      });
  }

  function loadData() {
    loadThePhoneBook();
  }

  function deleteContact(e) {
    let contactId = e.target.parentElement.id;
    fetch(`http://localhost:8000/phonebook/${contactId}`, {
      method: "DELETE",
    });

    setTimeout(loadThePhoneBook, 100);
  }

  function createData() {
    let person = document.getElementById("person");
    let phone = document.getElementById("phone");

    if (person.lenght !== 0 && phone.lenght !== 0) {
      fetch(`http://localhost:8000/phonebook`, {
        method: "POST",
        body: JSON.stringify({ person: person.value, phone: phone.value }),
      });

      loadThePhoneBook();
    }
    person.value = "";
    phone.value = "";
  }
}

attachEvents();
