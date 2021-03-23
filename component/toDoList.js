import { toDochange, toDos } from '../src/app.js';
import { saveToDos } from '../src/toDoLocalStorage.js';
import { filtering, handleCount } from './toDoFilter.js';

export const $toDoList = document.getElementById('todo-list');

export const handleToDoClick = (e) => {
  const $toDoLi = e.target.closest('li');

  if (e.target.className.includes('toggle')) {
    const $toDoToggle = e.target;
    handleToggle($toDoLi, $toDoToggle);
    filtering($toDoLi);
  } else if (e.target.className.includes('destroy')) {
    handleDestroy($toDoLi);
    handleCount(toDos);
    filtering($toDoLi);
  } else if (e.target.className.includes('label')) {
    handleEdit(e.target);
  }
  saveToDos();
};

export const renderToDos = (toDo) => {
  $toDoList.insertAdjacentHTML('beforeend', toDoTemplate(toDo));
};

const toDoTemplate = (toDo) => {
  return `<li id="${toDo.id}" class="${toDo.completed ? 'completed' : 'active'}">
        <div class="view">
          <input ${toDo.completed ? 'checked' : ''} class="toggle"  type="checkbox"/>
          <label class="label">${toDo.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${toDo.title}" />
      </li>`;
};
const handleDestroy = (toDo) => {
  const targetId = Number(toDo.getAttribute('id'));
  const newToDos = toDos.filter((item) => {
    return item.id !== targetId;
  });
  toDochange(newToDos);
};

const editNewTitle = (e) => {
  const $targetLi = e.target.closest('li');
  const targetId = parseInt($targetLi.getAttribute('id'));
  const newTitle = e.target.value;
  if (e.key === 'Enter') {
    let targetLabel = $targetLi.querySelector('label');
    targetLabel.innerText = newTitle;
    $targetLi.classList.remove('editing');
    toDos.map((toDo) => {
      if (toDo.id === targetId) toDo.title = newTitle;
    });
    saveToDos();
  } else if (e.key === 'Escape') {
    $targetLi.classList.remove('editing');
  }
};

const handleToggle = (toDo, toDoToggle) => {
  toDo.classList.toggle('completed');
  toDoToggle.classList.toggle('checked');
  completedUpdate(toDo);
};

export const toDoRenderClear = () => {
  $toDoList.innerText = '';
};

const completedUpdate = ($toDoLi) => {
  const toDoId = parseInt($toDoLi.getAttribute('id'));
  for (let obj of toDos) {
    if (obj.completed === false && obj.id === toDoId) {
      obj.completed = true;
    } else if (obj.completed === true && obj.id === toDoId) {
      obj.completed = false;
    }
  }
};

const handleEdit = (target) => {
  const $targetLi = target.closest('li');
  const $targetInput = $targetLi.querySelector('.edit');

  $targetLi.classList += ' editing';
  $targetInput.addEventListener('keydown', editNewTitle);
};
