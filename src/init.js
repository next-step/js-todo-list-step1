import { app } from './app.js';
import { loadToDos } from './toDoLocalStorage.js';
const init = () => {
  loadToDos();
  app();
};

init();
