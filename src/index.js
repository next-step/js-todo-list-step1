import MainController from './controllers/TodoApp.js';

document.addEventListener('DOMContentLoaded', () => {
  new MainController().init();
});
