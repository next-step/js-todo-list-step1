const inputTodo = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");

const todoCount = document.querySelector("span strong");
const allSelected = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");

function addTodoItem(e) {
  if (e.keyCode == 13 && e.target.value != "") {
    let inputText = inputTodo.value;
    let todoItem = document.createElement("li");

    todoItem.classList.add("new-item");
    todoItem.style.display = "block";
    todoItem.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${inputText}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${inputText} />
    `;
    inputTodo.value = "";
    todoList.append(todoItem);
    countTodo();
  }
}

function destroy(e) {
  if (e.target && e.target.className == "destroy") {
    e.target.parentNode.parentNode.remove();
    countTodo();
  }
}

function check(e) {
  if (e.target && e.target.className == "toggle") {
    e.target.parentNode.parentNode.classList.toggle("completed");
  }
}

function editItem(e) {
  if (e.target && e.target.className == "label") {
    let onEditItem = e.target.parentNode.parentNode;
    let EditText = e.target;
    let prevText = e.target.innerText;

    onEditItem.classList.add("editing");

    onEditItem.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        e.target.value = prevText;
        onEditItem.classList.remove("editing");
      }
      if (e.keyCode == 13) {
        EditText.innerHTML = e.target.value;
        onEditItem.classList.remove("editing");
      }
    });
  }
}

function countTodo() {
  let allItem = document.getElementsByClassName("new-item");
  let cnt = 0;
  for (let i = 0; i < allItem.length; i++) {
    if (allItem[i].style.display == "block") {
      cnt++;
    }
  }
  todoCount.innerText = cnt;
}

function showAll(e) {
  let allItem = document.getElementsByClassName("new-item");

  for (let i = 0; i < allItem.length; i++) {
    allItem[i].style.display = "block";
  }
  countTodo();
}

function showActive(e) {
  let allItem = document.getElementsByClassName("new-item");

  for (let i = 0; i < allItem.length; i++) {
    if (allItem[i].classList.contains("completed")) {
      allItem[i].style.display = "none";
    } else {
      allItem[i].style.display = "block";
    }
  }
  countTodo();
}

function showCompleted(e) {
  let allItem = document.getElementsByClassName("new-item");

  for (let i = 0; i < allItem.length; i++) {
    if (allItem[i].classList.contains("completed")) {
      allItem[i].style.display = "block";
    } else {
      allItem[i].style.display = "none";
    }
  }
  countTodo();
}

inputTodo.addEventListener("keydown", addTodoItem);
document.addEventListener("click", destroy);
document.addEventListener("click", check);
document.addEventListener("dblclick", editItem);
allSelected.addEventListener("click", showAll);
active.addEventListener("click", showActive);
completed.addEventListener("click", showCompleted);
