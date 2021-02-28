import { $toDoList, handleToDoClick, renderToDos } from '../component/toDoList.js';
import { handleFilterClick, handleCount, $toDofilters } from '../component/toDoFilter.js';
import { handleNewToDoInput, $toDoInput } from '../component/toDoInput.js';
import { saveToDos } from './toDoLocalStorage.js';

export let toDos = [];

export const addToDos = (newToDo) => {
  toDos.push(newToDo);
  saveToDos();
  renderToDos(newToDo);
  handleCount(toDos);
};

export const toDochange = (newToDo) => {
  toDos = [...newToDo];
  saveToDos();
};

export const app = () => {
  $toDoList && $toDoList.addEventListener('click', handleToDoClick);
  $toDoInput && $toDoInput.addEventListener('keydown', handleNewToDoInput);
  $toDofilters && $toDofilters.addEventListener('click', handleFilterClick);
};
