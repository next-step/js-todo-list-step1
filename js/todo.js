'ues strict';
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
const filters = document.querySelector('.filters');
const nowFilter = document.querySelector('.filters .selected');

const filterNames = ['all', 'active', 'completed'];

function init() {
  showCountItems(filters.querySelector('.all'));
  todoInput.addEventListener('keyup', event => {
    addTodoItem(event);
  });
  todoList.addEventListener('click', event => {
    toggleTodoItem(event);
    deleteTodoItem(event);
  });
  todoList.addEventListener('dblclick', event => {
    console.log('dblClick');
    toggleEditTodoItem(event);
  });
  todoList.addEventListener('keyup', event => {
    completeEditTodoItem(event);
  });
  filters.addEventListener('click', event => {
    showCountItems(event.target);
  });
}

function addTodoItem(event) {
  const todoTitle = event.target.value;
  if (event.key !== 'Enter' || todoTitle === '') {
    return;
  }
  console.log('addTodoItem() called');
  todoList.append(createTodoItemTemplate(todoTitle));
  event.target.value = '';
  showCountItems(filters.querySelector('.all'));
}

function createTodoItemTemplate(title) {
  console.log('createTodoItemTemplate() called');
  const li = document.createElement('li');
  const div = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const button = document.createElement('button');
  const editInput = document.createElement('input');

  // set elements
  div.setAttribute('class', 'view');
  input.setAttribute('class', 'toggle');
  input.setAttribute('type', 'checkbox');
  label.setAttribute('class', 'label');
  label.innerHTML = `${title}`;
  button.setAttribute('class', 'destroy');
  editInput.className = 'edit';
  editInput.setAttribute('value', title);

  // combine elements
  div.append(input);
  div.append(label);
  div.append(button);
  li.appendChild(div);
  li.append(editInput);
  return li;
}

function deleteTodoItem(event) {
  // check target
  if (event.target.className !== 'destroy') {
    return;
  }
  console.log('deleteTodoItem() called');
  const todoItem = event.target.closest('li');

  todoItem.remove();
  showCountItems(filters.querySelector('.all'));
}

function toggleTodoItem(event) {
  // check target
  if (event.target.className !== 'toggle') {
    return;
  }
  console.log('toggleTodoItem() called');
  const li = event.target.closest('li');

  li.classList.toggle('completed');
}

function showCountItems(target) {
  const filterName = target.classList[0];

  if (!filterNames.includes(filterName)) {
    return;
  }

  console.log('showCountItems() called');
  const todoCountText = document.querySelector('.todo-count>strong');

  switch (filterName) {
    case 'all':
      const totalNumber = document.querySelectorAll('.todo-list li').length;
      console.log('all');
      removeHidden();
      clearFilters();
      target.classList.add('selected');
      todoCountText.innerHTML = totalNumber;
      break;
    case 'active':
      const activeNumber = document.querySelectorAll(
        '.todo-list li:not(.completed)'
      ).length;
      console.log('active');
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
      console.log('completed');
      removeHidden();
      addHidden(`li:not(.completed)`);
      clearFilters();
      target.classList.add('selected');
      todoCountText.innerHTML = completedNumber;
      break;
  }
}

function clearFilters() {
  const filters = document.querySelectorAll('.filters a');
  for (const filter of filters) {
    filter.classList.remove('selected');
  }
}

function removeHidden() {
  const hiddenItems = document.querySelectorAll('.hidden');
  for (const item of hiddenItems) {
    item.classList.remove('hidden');
  }
}

function addHidden(selector) {
  const items = document.querySelectorAll(`.todo-list ${selector}`);
  for (const item of items) {
    item.classList.add('hidden');
  }
}

function toggleEditTodoItem(event, target) {
  if (event.target.className !== 'label') {
    return;
  }
  console.log('toggleEditTodoItem() called');
  const todoItem = event.target.parentElement.parentElement;
  todoItem.classList.toggle('editing');
}

function completeEditTodoItem(event) {
  if (event.key !== 'Enter') {
    return;
  }
  console.log('completeEditTodoItem() called');
  const todoItem = document.querySelector('.editing');
  const todoTitle = todoItem.querySelector('.edit').value;
  const todoLabel = todoItem.querySelector('.label');
  todoLabel.innerHTML = todoTitle;
  console.log(todoItem);
  todoItem.classList.toggle('editing');
}

init();
