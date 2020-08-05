{
  const clockDays = document.getElementsByClassName("clock-day")[0];
  const clockHours = document.getElementsByClassName("clock-hours")[0];
  const clockMinutes = document.getElementsByClassName("clock-minutes")[0];
  const clockSeconds = document.getElementsByClassName("clock-seconds")[0];
  const inputDate = document.getElementById("time-to");
  const startButton = document.getElementById("start-timer");
  const event = document.getElementById("event");
  const containerEventName = document.getElementById("container-event-name");
  const pElement = document.createElement("p");
  const eventsContainer = document.getElementsByClassName(
    "events-container"
  )[0];
  const ul = document.createElement("ul");
  ul.setAttribute("class", "events-list");
  eventsContainer.append(ul);

  event.addEventListener("focus", function () {
    event.setAttribute("placeholder", "");
  });
  event.addEventListener("blur", function () {
    event.setAttribute("placeholder", "Even Name");
  });

  let eventList = [];
  startButton.addEventListener("click", addEvent);

  function addEvent() {
    if (!event.value) {
      alert("Put the Event Name please");
    } else if (!inputDate.value) {
      alert("Chose a date");
    } else {
      let listEventItem = {
        name: event.value,
        data: inputDate.value,
      };

      let li = createEvent(event.value, eventList.length);
      ul.append(li);
      eventList.push(listEventItem);
      event.value = "";
    }
  }

  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;
  let milisecondsBetween = 0;

  function createEvent(eventName, inputId) {
    let li = document.createElement("li");
    let input = document.createElement("input");
    let span = document.createElement("span");

    input.setAttribute("type", "radio");
    input.setAttribute("name", "save-event");
    input.setAttribute("id", `${inputId}`);
    input.setAttribute("onchange", "getEvent(this.id)");
    span.innerHTML = eventName;

    li.append(input);
    li.append(span);

    return li;
  }

  function getEvent(id) {
    let element = eventList[id];
    pElement.innerHTML = element.name;
    containerEventName.append(pElement);

    let currentDate = new Date();
    let endData = new Date(element.data);
    milisecondsBetween = endData.getTime() - currentDate.getTime();
    days = findDays(milisecondsBetween);

    clockDays.innerHTML = days;

    startCountdown(element);
  }

  function setDateAndTime(elementData) {
    let currentDate = new Date();
    let endData = new Date(elementData.data);

    seconds = 60 - currentDate.getSeconds();
    minutes = 60 - currentDate.getMinutes();
    hours = 24 - currentDate.getHours();

    clockHours.innerHTML = hours;
    clockMinutes.innerHTML = minutes;
    clockSeconds.innerHTML = seconds;
  }

  function findDays(miliseconds) {
    let seconds = Math.floor(miliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    return days;
  }

  function startCountdown(event) {
    setInterval(() => {
      setDateAndTime(event);
      if (milisecondsBetween === 0) {
        alert("You Reach the event");
      } else if (milisecondsBetween < 0) {
        clearInterval();
      }
    });
  }
}
