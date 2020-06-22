import TodoApp from "./TodoApp.js";

const $targetTodoList = document.querySelector("#todo-list");
const $targetTodoInput = document.querySelector("#new-todo-title");
const $targetTodoCount = document.querySelector(".todo-count");
const $targetTodoFilter = document.querySelector(".filters");
const data = [
  {
    content: "새로운 타이틀",
    isCompleted: false,
  },
  {
    content: "완료된 타이틀",
    isCompleted: true,
  },
  {
    content: "완료된 타이틀",
    isCompleted: true,
  },
];
const params = {
  $targetTodoList,
  $targetTodoInput,
  $targetTodoCount,
  $targetTodoFilter,
  data,
};

new TodoApp(params);
