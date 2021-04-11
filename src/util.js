export const getElement = (selector) => document.querySelector(selector);

export const saveData = (data) => localStorage.setItem('todoList', JSON.stringify(data));

export const loadData = () => JSON.parse(localStorage.getItem('todoList'));