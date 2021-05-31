'use strict';
const $ = (selector) => document.querySelector(selector);
const $todoInput = $('.new-todo');
const $todoList = $('.todo-list');
const $filters = $('.filters');
let toDoItems = [];
let id = 1;

const $allSelectedBtn = $('.all');
const $activeBtn = $('.active');
const $completedBtn = $('.completed');

const ToDoList = 'todoList';

const saveToDosToLS = () => {
  localStorage.setItem(ToDoList, JSON.stringify(toDoItems));
}

const CountToDo = (items) => {
  let count = items.length
  const $toDoCount = $('.todo-count');

  $toDoCount.children[0].innerText = count; //strong tag
};

const AddToDo = (contents) => {
  const newToDoItem = {
    id: id++,
    data: contents,
    completed: false
  };
  toDoItems.push(newToDoItem);
  CountToDo(toDoItems);
  saveToDosToLS();
}

const toDoItemTemplate = (item) => {
  return (
    `
      <li id="${item.id}" class="${item.completed ? 'completed' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}/>
          <label class="label">${item.data}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.data}" />
      </li>
      `
  );
}

const render = items => {
  const template = items.map(item => toDoItemTemplate(item));
  $todoList.innerHTML = template.join("");
  if (items.length > 0) {
    CountToDo(items);
  }
}

const ToggleItem = e => {
  const $li = e.target.closest('li');
  if ($li.classList.contains('completed')) {
    $li.classList.remove('completed');
    e.target.removeAttribute('checked');
  } else {
    $li.classList.add('completed');
    e.target.setAttribute('checked', '');
  }
  toDoItems.forEach(item => {
    if (item.id === parseInt($li.id)) {
      item.completed = !item.completed;
    }
  })
}

const RemoveItem = e => {
  const $li = e.target.closest('li');
  $todoList.removeChild($li);
  toDoItems = toDoItems.filter(item => item.id !== parseInt($li.id));

  const filterActive = toDoItems.filter(item => item.completed === false);
  const filterCompleted = toDoItems.filter(item => item.completed === true);

  if ($allSelectedBtn.classList.contains('selected')) {
    CountToDo(toDoItems);
  } else if ($activeBtn.classList.contains('selected')) {
    CountToDo(filterActive);
  } else if ($completedBtn.classList.contains('selected')) {
    CountToDo(filterCompleted);
  }

  saveToDosToLS();
}

const EditMode = e => {
  const $li = e.target.closest('li');
  $li.classList.add('editing');
  $li.addEventListener('keydown', e => {
    const $input = e.target;
    const $label = e.target.previousElementSibling.children[1];

    if (e.key == 'Enter') {
      $label.innerText = $input.value;
      $input.setAttribute('value', $label.innerText);
      $li.classList.remove('editing');

      toDoItems.forEach(item => {
        if (item.id === parseInt($li.id)) {
          item.data = $label.innerText;
        }
      })

    } else if (e.key == 'Escape') {
      $li.classList.remove('editing');
    }
  });
}

const filter = e => {
  const filterActive = toDoItems.filter(item => item.completed === false);
  const filterCompleted = toDoItems.filter(item => item.completed === true);

  if (e.target.className === 'active') {
    e.target.classList.add('selected');
    $allSelectedBtn.classList.remove('selected');
    $completedBtn.classList.remove('selected');

    render(filterActive);
  } else if (e.target.className === 'completed') {
    e.target.classList.add('selected');
    $allSelectedBtn.classList.remove('selected');
    $activeBtn.classList.remove('selected');

    render(filterCompleted);
  }
};

$filters.addEventListener('click', e => {
  if (e.target.className === 'all') {
    e.target.classList.add('selected');
    $activeBtn.classList.remove('selected');
    $completedBtn.classList.remove('selected');

    render(toDoItems);
  } else {
    filter(e);
  }
});

$todoList.addEventListener('dblclick', e => {
  EditMode(e);
});

$todoList.addEventListener('click', e => {
  if (e.target.classList.contains('toggle')) {
    ToggleItem(e);
  } else if (e.target.classList.contains('destroy')) {
    RemoveItem(e);
  }
});

$todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value !== '') {
    AddToDo(e.target.value);
    e.target.value = "";
  }
  render(toDoItems);
});

function loadToDosInLS() {
  const loadedToDos = localStorage.getItem(ToDoList);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.map(item => toDoItems.push(item));
  }
}

function init() {
  loadToDosInLS();
}


