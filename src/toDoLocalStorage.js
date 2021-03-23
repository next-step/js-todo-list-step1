import * as app from './app.js';
const TODOS_LS = 'toDos';

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(app.toDos));
};

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos === null) {
  } else {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      app.addToDos(toDo);
    });
  }
}

export { saveToDos, loadToDos };
