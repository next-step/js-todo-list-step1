'ues strict';
const $todoInput = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $filterList = document.querySelector('.filters');

// for Local Storage
let todos = [];

function init() {
  loadTodoList();
  showCount($filterList.querySelector('.all'));

  $todoInput.addEventListener('keyup', addTodoItem);
  $todoList.addEventListener('click', onClickTodoList);
  $todoList.addEventListener('dblclick', onDoubleClickTodo);
  $todoList.addEventListener('keyup', completeEditTodoItem);
  $filterList.addEventListener('click', onClickFilter);
}

// for eventListener
function onClickTodoList(event) {
  if (event.target.className === 'destroy') return deleteTodoItem(event);
  else if (event.target.className === 'toggle') return toggleTodoItem(event);
}

function onClickFilter(event) {
  showCount(event.target);
}

function onDoubleClickTodo(event) {
  console.log('onDoubleClickTodo() called');
  if (event.target.className !== 'label') return;

  const todoItem = event.target.parentElement.parentElement;
  todoItem.classList.toggle('editing');
}

/* add */
function addTodoItem(event) {
  console.log('addTodoItem() called');
  if (event.key !== 'Enter' || $todoInput.value === '') return;

  const todoText = $todoInput.value;

  $todoInput.value = '';
  createTodoItemTemplate(todoText);
  saveTodoList();
  showCount($filterList.querySelector('.all'));
}

function createTodoItemTemplate(title, state = null) {
  console.log('createTodoItemTemplate() called');
  const li = document.createElement('li');
  const div = document.createElement('div');
  const toggleInput = document.createElement('input');
  const label = document.createElement('label');
  const button = document.createElement('button');
  const editInput = document.createElement('input');
  const newId = todos.length + 1;

  // set elements
  li.id = newId;
  if (state === 'completed') li.className = state;
  div.setAttribute('class', 'view');
  if (state === 'completed') toggleInput.checked = true;
  toggleInput.setAttribute('class', 'toggle');
  toggleInput.setAttribute('type', 'checkbox');
  label.setAttribute('class', 'label');
  label.innerHTML = `${title}`;
  button.setAttribute('class', 'destroy');
  editInput.className = 'edit';
  editInput.setAttribute('value', title);

  // combine elements
  div.append(toggleInput);
  div.append(label);
  div.append(button);
  li.append(div);
  li.append(editInput);
  $todoList.append(li);
  todos.push({ text: title, id: newId, state: null });
  return li;
}

/* delete */
function deleteTodoItem(event) {
  console.log('deleteTodoItem() called');
  const todoItem = event.target.closest('li');
  todos = todos.filter(todo => {
    return todo.id !== parseInt(todoItem.id);
  });

  todoItem.remove();
  saveTodoList();
  showCount($filterList.querySelector('.all'));
}

/* toggle */
function toggleTodoItem(event) {
  console.log('toggleTodoItem() called');

  const todoItem = event.target.closest('li');
  todoItem.classList.toggle('completed');
  console.log(todoItem.id);
  const findTodo = todos.find(item => {
    return item.id === parseInt(todoItem.id);
  });
  console.log(findTodo);

  if (event.target.checked) {
    findTodo.state = 'completed';
  } else if (!event.target.checked) {
    findTodo.state = null;
  }
  saveTodoList();
}

/* count */
function showCount(target) {
  console.log('showCount() called');
  const filterName = target.classList[0];
  const todoCountText = document.querySelector('.todo-count>strong');

  switch (filterName) {
    case 'all':
      const totalNumber = document.querySelectorAll('.todo-list li').length;
      removeHidden();
      clearFilters();
      target.classList.add('selected');
      todoCountText.innerHTML = totalNumber;
      break;
    case 'active':
      const activeNumber = document.querySelectorAll(
        '.todo-list li:not(.completed)'
      ).length;
      removeHidden();
      clearFilters();
      addHidden('.completed');
      target.classList.add('selected');
      todoCountText.innerHTML = activeNumber;
      break;
    case 'completed':
      const completedNumber = document.querySelectorAll(
        '.todo-list li.completed'
      ).length;
      removeHidden();
      addHidden(`li:not(.completed)`);
      clearFilters();
      target.classList.add('selected');
      todoCountText.innerHTML = completedNumber;
      break;
  }
}

function clearFilters() {
  console.log('clearFilters() called');
  const filters = document.querySelectorAll('.filters a');
  for (const filter of filters) {
    filter.classList.remove('selected');
  }
}

function removeHidden() {
  console.log('removeHidden() called');
  const hiddenItems = document.querySelectorAll('.hidden');
  for (const item of hiddenItems) {
    item.classList.remove('hidden');
  }
}

function addHidden(selector) {
  console.log('addHidden() called');
  const items = document.querySelectorAll(`.todo-list ${selector}`);
  for (const item of items) {
    item.classList.add('hidden');
  }
}

/* edit */
function completeEditTodoItem(event) {
  console.log('completeEditTodoItem() called');
  if (event.key !== 'Enter') return;

  const todoItem = document.querySelector('.editing');
  const todoText = todoItem.querySelector('.edit').value;
  const todoLabel = todoItem.querySelector('.label');
  const findItem = todos.find(item => {
    return item.id === parseInt(todoItem.id);
  });
  findItem.text = todoText;
  saveTodoList();
  todoLabel.innerHTML = todoText;
  todoItem.classList.toggle('editing');
}

/* Local Storage */
function saveTodoList() {
  console.log('saveTodoList() called');
  localStorage.setItem('todoList', JSON.stringify(todos));
}

function loadTodoList() {
  console.log('loadTodoList() called');
  const loadedTodoList = localStorage.getItem('todoList');
  const parsedToDos = JSON.parse(loadedTodoList);

  if (loadedTodoList === null) return;
  parsedToDos.forEach(todo => {
    $todoList.append(createTodoItemTemplate(todo.text, todo.state));
  });
}

init();
