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
  toDos.map((a) => renderToDos(a));
  handleCount(toDos);
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

const handleCount = (toDo) => {
  $toDoCount.innerText = toDo.length;
};
const addToDos = (newToDo) => {
  toDos.push(newToDo);
  renderToDos(newToDo);
};

const newTodoInputSubmit = (newTitle) => {
  const newToDo = {
    id: Date.now(),
    title: newTitle,
    completed: false,
  };
  addToDos(newToDo);
  $toDoInput.value = '';
};
const handleNewToDoInput = (e) => {
  const newTitle = e.target.value;
  if (e.key === 'Enter') {
    newTodoInputSubmit(newTitle);
  }
};

const toDoClear = () => {
  $toDoList.innerText = '';
};

const handleDestroy = (toDo) => {
  const targetId = parseInt(toDo.getAttribute('id'));
  toDos = toDos.filter((item) => {
    return item.id !== targetId;
  });
  toDoClear();
  toDos.forEach((item) => renderToDos(item));
};

const handleToDoClick = (e) => {
  const $toDoLi = e.target.closest('li');

  if (e.target.className.includes('toggle')) {
    const $toDoToggle = e.target;
    handleToggle($toDoLi, $toDoToggle);
  } else if (e.target.className.includes('destroy')) {
    handleDestroy($toDoLi);
    handleCount(toDos);
  }
};

$toDoList && $toDoList.addEventListener('click', handleToDoClick);
$toDoInput && $toDoInput.addEventListener('keydown', handleNewToDoInput);
