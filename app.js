let toDos = [
  { id: 1, title: '테스트입니다1', completed: false },
  { id: 2, title: '테스트입니다2', completed: true },
  { id: 3, title: '테스트입니다3', completed: true },
  { id: 4, title: '테스트입니다4', completed: false },
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
  handleCount(toDos);
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
    filtering(e.target);
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
  } else if (e.key === 'Escape') {
    $targetLi.classList.remove('editing');
  }
};

const handleEdit = (target) => {
  const $targetLi = target.closest('li');
  const $targetInput = $targetLi.querySelector('.edit');

  $targetLi.classList += ' editing';
  $targetInput.addEventListener('keydown', editNewTitle);
};

const handleToDoClick = (e) => {
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
};

const handleToggle = (toDo, toDoToggle) => {
  toDo.classList.toggle('completed');
  toDoToggle.classList.toggle('checked');
  toDoUpdate(toDo);
};

const toDoUpdate = ($toDoLi) => {
  const toDoId = parseInt($toDoLi.getAttribute('id'));
  for (let obj of toDos) {
    if (obj.completed === false && obj.id === toDoId) {
      obj.completed = true;
    } else if (obj.completed === true && obj.id === toDoId) {
      obj.completed = false;
    }
  }
};
const FilterStateAll = () => {
  toDoClear();
  toDos.forEach((toDo) => renderToDos(toDo));
};
const FilterStateActive = () => {
  toDoClear();
  const newToDos = toDos.filter((item) => {
    return item.completed === false;
  });
  newToDos.forEach((toDo) => renderToDos(toDo));
};
const FilterStateCompleted = () => {
  toDoClear();
  const newToDos = toDos.filter((item) => {
    return item.completed === true;
  });
  newToDos.forEach((toDo) => renderToDos(toDo));
};

const findFilter = (e) => {
  const $todoApp = e.closest('.todoapp');
  const filterAtags = $todoApp.querySelectorAll('.filters a');

  for (const item of filterAtags) {
    if (item.className.includes('selected')) {
      return item.className.split(' ')[0];
    }
  }
};
const filtering = (filterState) => {
  filterState = typeof filterState === 'string' ? filterState : findFilter(filterState);

  if (filterState === 'all') {
    FilterStateAll();
  } else if (filterState === 'active') {
    FilterStateActive();
  } else if (filterState === 'completed') {
    FilterStateCompleted();
  }
};
const filterClear = (filterAtag) => {
  filterAtag.forEach((item) => {
    item.classList.remove('selected');
  });
  return filterAtag;
};

const handleFilterClick = (e) => {
  e.preventDefault();

  const filterState = e.target.className;
  const $filterAtag = $toDofilters.querySelectorAll('a');
  const filters = filterClear($filterAtag);

  filters.forEach((item) => {
    if (item.className === filterState) {
      item.classList.toggle('selected');
      filtering(filterState);
    }
  });
};

$toDoList && $toDoList.addEventListener('click', handleToDoClick);
$toDoInput && $toDoInput.addEventListener('keydown', handleNewToDoInput);
$toDofilters && $toDofilters.addEventListener('click', handleFilterClick);
