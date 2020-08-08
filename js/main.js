import TodoApp from './TodoApp.js';

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

new TodoApp({$todoInput, $todoList});