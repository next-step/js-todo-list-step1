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

const reActive = new RegExp("#active");
const reCompleted = new RegExp("#completed");

function todoList() {
  const URL = location.href;
  if(reActive.exec(URL)) {
    return todoStore.getState().todos.filter( todo => 
        todo.state === "active"
      );
  } else if(reCompleted.exec(URL)) {
    return todoStore.getState().todos.filter( todo => 
      todo.state === "completed"
    );
  } else {
    return todoStore.getState().todos
  }
}

function init() {
  const todoApp = todoList().map((todo, key) => 
    TodoApp(todo, key)
  );
  app.render($todoContainer, todoApp);
  $todoCount.innerHTML = todoList().length;
}

function modify({key, stateId}) {
  const unitTodoState = todoStore.getState().todos.filter(todo => todo.id === stateId)[0];
  app.modifyFiber(TodoApp(unitTodoState, key), key);
}

export const todoState = new useState(modify);

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
  $todoFilters.addEventListener("click", (e)=> {
    // e.preventDefault();
    if(e.target.tagName === "A") {
      window.setTimeout(init, 0);
    }
  });
}

todoStore.dispatch({state: null,action: null});
todoStore.subscribe(init);

init();
domEventListeners();

