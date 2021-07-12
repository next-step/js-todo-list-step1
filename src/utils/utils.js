const $ = (selector, tag = document) => tag.querySelector(selector);
const $$ = (selector, tag = document) => tag.querySelectorAll(selector);
const setLocalStorageItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getLocalStorageItem = (key) => {
  const todoList = localStorage.getItem(key);
  return JSON.parse(todoList);
};

export { $, $$, setLocalStorageItem, getLocalStorageItem };
