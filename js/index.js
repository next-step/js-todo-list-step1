// import { makeLocalStorageObject } from "makeLocalStorageObject.js";

let id_No = localStorage.length;

class makeLocalStorageObject {
  constructor(id, value) {
    this.id = 0;
    this.value = "";
  }

  getId() {
    return id;
  }

  getValue() {
    return value;
  }

  setId(id) {
    this.id = id;
  }
  setValue(value) {
    this.value = value;
  }

  toString() {
    console.log(this);
  }
}

let storageObject = new makeLocalStorageObject();

window.onload = () => {
  //   localStorage.clear();
  todoList();
  saveTodos();
};

const setLocalStorage = (param) => {
  localStorage.setItem(param.id, param.value);
};

const saveTodos = () => {
  const todos = document.querySelector("#new-todo-title");

  todos.addEventListener("keypress", $onAddTodoHandle);
};

const $onAddTodoHandle = (event) => {
  const todos = document.querySelector("#new-todo-title");

  if (event.keyCode === 13) {
    storageObject.setId(id_No);
    storageObject.setValue(todos.value);
    addTodos(storageObject);
    setLocalStorage(storageObject);
    id_No++;
  }
};

const addTodos = (param) => {
  const todoList = document.querySelector("#todo-list");
  todoList.insertAdjacentHTML("beforeend", renderTodoItemli(param.value));
};

const todoList = () => {
  const items = createLocalStorageArray();
  createLocalStorageObject();
  console.log(items);
  const todoList = document.querySelector("#todo-list");

  items.forEach((item) => {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemli(item));
  });
  checkedTodos();
  deleteTodos();
};

const checkedTodos = () => {
  const checkBoxes = document.querySelectorAll(".toggle");
  checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", $onCheckedTodoHandle);
  });
};

const $onCheckedTodoHandle = (event) => {
  let li = event.target.parentNode.parentNode;
  li.classList.toggle("completed");
};

const deleteTodos = () => {
  const deleteTodos = document.querySelectorAll(".destroy");
  deleteTodos.forEach((deleteTodo) => {
    deleteTodo.addEventListener("click", $onClickDeleteTodoHandle);
  });
};

const $onClickDeleteTodoHandle = (event) => {
  let li = event.target.parentNode.parentNode;
  li.remove();
};

const createLocalStorageArray = () => {
  let array = [];
  for (let index = 0; index < localStorage.length; index++) {
    array.push(localStorage.getItem(index));
  }
  return array;
};

const createLocalStorageObject = () => {
  storageObject.toString();
};

const renderTodoItemli = (title) => {
  return `<li>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>${title}</label>
              <button class="destroy"></button>
            </div>
          </li>`;
};
