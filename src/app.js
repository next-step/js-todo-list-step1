import TodoApp from './components/TodoApp.js';
import LocalStorage from './components/LocalStorage.js';

const LS_KEY = 'TODOS';
window.addEventListener('DOMContentLoaded', () => {
  const storage = new LocalStorage(LS_KEY);
  const savedData = storage.getItems();

  const todoApp = new TodoApp(storage);
  todoApp.init(savedData);
});
