import { addToDos } from '../src/app.js';
import { saveToDos } from '../src/toDoLocalStorage.js';
import { filtering } from '../component/toDoFilter.js';

export const $toDoInput = document.getElementById('new-todo-title');

function newTodoInputSubmit(newTitle) {
  const newToDo = {
    id: Date.now(),
    title: newTitle,
    completed: false,
  };
  addToDos(newToDo);
  $toDoInput.value = '';
}
export const handleNewToDoInput = (e) => {
  const newTitle = e.target.value;
  if (e.key === 'Enter') {
    newTodoInputSubmit(newTitle);
    filtering(e.target);
  }
  saveToDos();
};
