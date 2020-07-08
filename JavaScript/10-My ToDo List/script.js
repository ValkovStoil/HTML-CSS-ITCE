let allTasksArray = [];
let filteredTasksArray = [];

let taskToAdd = document.getElementById("add-task-input");
let taskLabel = document.getElementById("label-task");

let placeholder = "";

taskToAdd.addEventListener("focus", () => {
  placeholder = taskToAdd.placeholder;
  taskToAdd.setAttribute("placeholder", "");
  taskLabel.style.display = "block";
});

taskToAdd.addEventListener("blur", () => {
  taskToAdd.setAttribute("placeholder", placeholder);
  taskLabel.style.display = "none";
});

let filterTasks = document.getElementById("filter");
let filterLable = document.getElementById("label-filter");

filterTasks.addEventListener("focus", () => {
  placeholder = filterTasks.placeholder;
  filterTasks.setAttribute("placeholder", "");
  filterLable.style.display = "block";
});

filterTasks.addEventListener("blur", () => {
  filterTasks.setAttribute("placeholder", placeholder);
  filterLable.style.display = "none";
});

let addTaskButton = document.getElementById("add-task-btn");
let taskContainer = document.getElementById("task-container");

if (taskContainer.childNodes.length !== 0) {
  taskContainer.style.display = "block";
} else {
  taskContainer.style.display = "non";
}

document.onkeydown = function (e) {
  let keyCode = e.keyCode;

  if (keyCode == 13 && taskToAdd.value !== "") {
    allTasksArray.push(taskToAdd.value);

    let resultTask = createTask();

    resultTask.childNodes[0].innerHTML = taskToAdd.value;
    taskContainer.append(resultTask);
    taskToAdd.value = "";
  }
};

addTaskButton.addEventListener("click", addTask);

function notFilteredTsks() {
  taskContainer.innerHTML = "";

  allTasksArray.forEach((element) => {
    let resultTask = createTask();

    resultTask.childNodes[0].innerHTML = element;
    taskContainer.append(resultTask);
  });
}

function addTask() {
  //take the task from inpute value
  let inputTask = taskToAdd.value;

  if (inputTask.trim()) {
    allTasksArray.push(inputTask);
  }
  notFilteredTsks();

  //Clear the input field
  taskToAdd.value = "";
}

let clearTaskNotes = document.getElementById("remove-tasks-btn");

clearTaskNotes.addEventListener("click", clearTasks);

function clearTasks() {
  taskContainer.innerHTML = "";
  allTasksArray = [];
  filterTasks.value = "";
}

function getElement(e) {
  let remove = e.target.parentElement;
  let taskToRemove = remove.previousSibling.innerHTML;

  if (confirm("Task will be removed!")) {
    removeTask(taskToRemove);
  }
}

function removeTask(taskToRemove) {
  let removeIndex = allTasksArray.indexOf(taskToRemove);
  allTasksArray.splice(removeIndex, 1);

  taskContainer.innerHTML = "";

  if (filterTasks.value !== "") {
    let filterText = filterTasks.value;
    filteredTasksArray = allTasksArray.filter((element) => {
      return element.includes(filterText);
    });
    addFilteredTasks();
  } else {
    notFilteredTsks();
  }
}

function createTask() {
  let tsk = document.createElement("li");
  let ancorTag = document.createElement("a");
  let iTag = document.createElement("i");
  let spanTag = document.createElement("span");
  iTag.className = "fas fa-times";
  iTag.onclick = function () {
    getElement(event);
  };

  ancorTag.appendChild(iTag);
  tsk.appendChild(spanTag);
  tsk.appendChild(ancorTag);

  return tsk;
}

function addFilteredTasks() {
  filteredTasksArray.forEach((element) => {
    let resultTask = createTask();

    resultTask.childNodes[0].innerHTML = element;
    taskContainer.append(resultTask);
  });
}

//get the input value dynamically
let filterText = "";
filterTasks.onkeyup = () => {
  filterText = filterTasks.value;

  //   fill up the array with filtered strings
  filteredTasksArray = allTasksArray.filter((element) => {
    return element.includes(filterText);
  });

  if (filteredTasksArray.length > 0) {
    taskContainer.innerHTML = "";

    addFilteredTasks();
  } else if (filteredTasksArray.length > 0 || filterText.length !== 0) {
    taskContainer.innerHTML = "";
  }
};
