function solve() {
  const departing = document.getElementById("depart");
  const arriving = document.getElementById("arrive");
  const infoBox = document.getElementsByClassName("info")[0];
  let currentId = "depot";

  function depart() {
    fetch(`http://localhost:8000/schedule/${currentId}`)
      .then((data) => data.json())
      .then((response) => {
        let stopName = response.name;

        infoBox.innerHTML = `Next stop ${stopName}`;
        departing.disabled = true;
        arriving.disabled = false;
      })
      .catch((error) => {
        infoBox.innerHTML = `Error`;
        departing.disabled = true;
        arriving.disabled = true;
      });
  }

  function arrive() {
    fetch(`http://localhost:8000/schedule/${currentId}`)
      .then((data) => data.json())
      .then((response) => {
        let stopName = response.name;
        currentId = response.next;

        infoBox.innerHTML = `Arriving at ${stopName}`;
        departing.disabled = false;
        arriving.disabled = true;
      })
      .catch((error) => {
        infoBox.innerHTML = `Error`;
        departing.disabled = true;
        arriving.disabled = true;
      });
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
