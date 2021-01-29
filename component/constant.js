const todoListEl = document.getElementById("todo-list");
const todoCountEl = document.querySelector(".todo-count");
const countContainerEl = document.querySelector(".count-container");
const allEl = document.querySelector(".all");
const activeEl = document.querySelector(".active");
const completedEl = document.querySelector(".completed");
const filterEls = document.querySelectorAll(".filters a");

const toDoInput = document.getElementById("new-todo-title");

export {
  todoCountEl,
  countContainerEl,
  todoListEl,
  allEl,
  activeEl,
  completedEl,
  filterEls,
  toDoInput,
};
