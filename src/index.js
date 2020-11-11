import DynamicDom from "./core/DynamicDom.js";
import useState   from "./core/useState.js";

import TodoApp from "./components/TodoApp.js";

import { reducer, addTodo } from "./store/store.js";

export const app = new DynamicDom(reducer);

const $todoContainer = document.getElementById("todo-list");
const $todoInput = document.querySelector(".new-todo");
const $todoCount = document.querySelector(".todo-count").querySelector("strong");
const $todoFilters = document.querySelector(".filters");

const initData = localStorage.getItem("todo")
  ? JSON.parse(localStorage.getItem("todo"))
  : { todos: [] };
app.setState(initData);

function init() {
  app.getState().todos.forEach((todo, key) => {
    app.addFiberList(TodoApp(todo, key), key);
  });
  app.render($todoContainer);
  $todoCount.innerHTML = app.getState().todos.length;
}

export const todoState = new useState(init);

function addTodoList(e) {
  if(e.keyCode === 13) {
    if(e.target.value === "") {
      window.alert("내용을 입력해주세요.");
    } else {
      const id = app.getState().todos[0]? app.getState().todos[app.getState().todos.length-1].id + 1 : 1
      app.dispatch(addTodo(id, e.target.value));
      e.target.value = "";
    }
  }
}

function todoFilter(e) {
  // e.preventDefault()
  console.log(location.href)
  if(e.target.tag === "A") {

  }
}

function domEventListeners() {
  $todoInput.addEventListener("keypress", addTodoList);
  $todoFilters.addEventListener("click", todoFilter);
}

app.subscriber(init);

init();
domEventListeners();



const APIURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

fetch(`${APIURL}/api/users`)
  .then(data => {
    return data.json()
  })
  .then(data => {
    console.log(data);
  })
