let toDos = [
  { id: 1, title: '테스트입니다1', completed: false },
  { id: 2, title: '테스트입니다2', completed: true },
  { id: 3, title: '테스트입니다4', completed: true },
  { id: 4, title: '테스트입니다5', completed: false },
];

const $toDoInput = document.getElementById('new-todo-title');
const $toDoList = document.getElementById('todo-list');
const $toDoCount = document.querySelector('.todo-count strong');
const $toDofilters = document.querySelector('.filters');

export const loadToDos = () => {
  console.log('load toDos');
  toDos.map((a) => renderToDos(a));
  console.log(toDos);
  handleCount();
};

const renderToDos = (toDo) => {
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
