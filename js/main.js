import TodoApp from './TodoApp.js';

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $todoCount = document.querySelector(".todo-count");

new TodoApp({$todoInput, $todoList, $todoCount});