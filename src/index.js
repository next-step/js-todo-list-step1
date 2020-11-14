import DynamicDom  from "./core/DynamicDom.js";
import createStore from "./core/store.js";
import useState    from "./core/useState.js";

import TodoApp from "./components/TodoApp.js";

import { reducer, addTodo } from "./store/index.js";

export const app = new DynamicDom();

export const todoStore = new createStore(reducer);

const $todoContainer = document.getElementById("todo-list");
const $todoInput = document.querySelector(".new-todo");
const $todoCount = document.querySelector(".todo-count").querySelector("strong");
const $todoFilters = document.querySelector(".filters");

function validation() {
  const reActive = new RegExp("#active");
  const reCompleted = new RegExp("#completed");
  const URL = location.href;

  if(reActive.exec(URL)) {
    return "active"
  } else if(reCompleted.exec(URL)) {
    return "completed"
  } else {
    return "all"
  }
}

function filterTodoList() {
  const type = validation();

  return type === "all"
    ? todoStore.getState().todos
    : todoStore.getState().todos.filter( todo => 
        todo.state === type
    );
}

function changeFiltersButtonStyle() {
  const type = validation()
  const $selected = $todoFilters.querySelector(".selected");
  const $activeBtn = $todoFilters.getElementsByClassName(type)[0];

  if($selected) {
    $selected.classList.remove("selected")
  }
  console.log($activeBtn)

  $activeBtn.classList.add("selected");
}

function addTodoList(e) {
  if(e.keyCode === 13) {
    if(e.target.value === "") {
      window.alert("내용을 입력해주세요.");
    } else {
      const id = todoStore.getState().todos[0]? todoStore.getState().todos[todoStore.getState().todos.length-1].id + 1 : 1
      todoStore.dispatch(addTodo(id, e.target.value, "active"));
      e.target.value = "";
    }
  }
}

function domEventListeners() {
  $todoInput.addEventListener("keypress", addTodoList);
  $todoFilters.addEventListener("click", ({target})=> {
    if(target.tagName === "A") {
      window.setTimeout(renderTodoApp, 0);
    }
  });
}

function renderTodoApp() {
  const todoStateList = filterTodoList();
  changeFiltersButtonStyle();
  $todoCount.innerHTML = todoStateList.length;
  const todoApp = todoStateList.map((todo, key) => 
    TodoApp(todo, key)
  );
  app.render($todoContainer, todoApp);
}

function modify({key, stateId}) {
  const unitTodoState = todoStore.getState().todos.filter(todo => todo.id === stateId)[0];
  app.modifyFiber(TodoApp(unitTodoState, key), key);
}

export const todoState = new useState(modify);


function init() {
  todoStore.dispatch({state: null,action: null});
  todoStore.subscribe(renderTodoApp);
  renderTodoApp();
  domEventListeners();
}

init();


