import TodoApp from './TodoApp.js';

// window.addEventListener('load', () => TodoApp());
const main = () => {
  new TodoApp();
};

// document.addEventListener('DOMContentLoaded', main);
window.addEventListener('load', main);
