const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDos = [];
let finishes = [];

function paintFinish(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const movePendingBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finishes.length + 1;
  delBtn.innerText = "❌";
  movePendingBtn.innerText = "⏪";

  delBtn.addEventListener("click", deleteFinish);
  movePendingBtn.addEventListener("click", movePending);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(movePendingBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishObj = {
    text: text,
    id: newId
  };
  finishes.push(finishObj);
  saveFinishes();
}

function movefinish(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDos.forEach(function (toDo) {
    if (toDo.id === parseInt(li.id)) {
      paintFinish(toDo.text);
    }
  });

  deleteToDo(event);
}

function movePending(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finishes.forEach(function (finish) {
    if (finish.id === parseInt(li.id)) {
      paintToDo(finish.text);
    }
  });

  deleteFinish(event);
}

function deleteFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanfinishes = finishes.filter(function (finishes) {
    return finishes.id !== parseInt(li.id);
  });
  finishes = cleanfinishes;
  saveFinishes();
}

function saveFinishes() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishes));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const movefinishBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  movefinishBtn.innerText = "✅";

  delBtn.addEventListener("click", deleteToDo);
  movefinishBtn.addEventListener("click", movefinish);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(movefinishBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFinishes() {
  const loadFinishes = localStorage.getItem(FINISHED_LS);
  if (loadFinishes !== null) {
    const parsedFinishes = JSON.parse(loadFinishes);
    parsedFinishes.forEach(function (finish) {
      paintFinish(finish.text);
    });
  }
}

function init() {
  loadToDos();
  loadFinishes();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
