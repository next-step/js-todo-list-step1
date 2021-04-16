import TodoApp from './TodoApp.js';

// window.addEventListener('load', () => TodoApp());

const init = () => {
  new TodoApp();
};

// document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', init);
// ❓ new todoApp(); 이랑 무슨 차이?
