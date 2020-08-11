import { createUniqueID } from "./util.js";

export const todoListId = "todo-list";
export const todoInputId = "new-todo-title";
export const todoCountId = "todo-count";
export const todoFilterId = "filters";
export const TODOS = "todoList";
export const goalList = [
  {
    id: `${createUniqueID()}0`,
    content: "JS 복습하기",
    isCompleted: false,
  },
  {
    id: `${createUniqueID()}1`,
    content: "JS 예습하기",
    isCompleted: false,
  },
  {
    id: `${createUniqueID()}2`,
    content: "BlackCoffee 과제하기",
    isCompleted: false,
  },
];
