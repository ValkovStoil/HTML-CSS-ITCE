function getInfo() {
  let stopId = document.getElementById("stopId").value;
  let stopName = document.getElementById("stopName");
  let busesId = document.getElementById("buses");

  fetch(`http://localhost:8000/businfo/${stopId}`)
    .then((data) => data.json())
    .then((response) => {
      stopName.innerHTML = response.name;
      busesId.innerHTML = "";

      let vehicles = response.buses;

      for (const buss in vehicles) {
        let li = document.createElement("li");

        li.innerHTML = `Bus ${buss} arrives in ${vehicles[buss]}`;
        busesId.append(li);
      }
    })
    .catch((error) => {
      stopName.innerHTML = "Error";
      busesId.innerHTML = "";
    });
}
