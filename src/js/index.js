const $ = (selector = '') => document.querySelector(selector);

const $todoInput = $('#new-todo-title');
const $todoList = $('#todo-list');
const $todoCount = $('.todo-count strong');

function toggleTodoItem(event) {
  const { target } = event;
  if (!target.classList.contains('toggle')) return;

  const todoItem = target.closest('li');
  todoItem.classList.toggle('completed');
  target.toggleAttribute('checked');
}

function removeTodoItem(event) {
  const { target } = event;
  if (!target.classList.contains('destroy')) return;

  const todoItem = target.closest('li');
  todoItem.remove();

  $todoCount.innerText--;
}

function editTodoItem(event) {
  const { target } = event;
  if (!target.classList.contains('label')) return;

  const todoItem = target.closest('li');
  todoItem.classList.toggle('editing');

  const editingInput = todoItem.querySelector('.edit');
  editingInput.focus();
  const { length } = editingInput.value;
  editingInput.setSelectionRange(length, length);
}

function updateTodoItem(event) {
  const { key, target } = event;
  if (!target.classList.contains('edit')) return;

  const todoItem = target.closest('li');

  if (key === 'Escape') {
    todoItem.classList.remove('editing');
    return;
  }

  if (key !== 'Enter') return;

  const { value } = target;
  if (value === '') return;

  const label = todoItem.querySelector('.label');
  todoItem.classList.remove('editing');
  label.innerText = value;
  target.defaultValue = value;
}

function addTodoItem(event) {
  if (event.key !== 'Enter') return;

  const { value } = $todoInput;
  if (value === '') return;

  const todoItem = document.createElement('li');
  todoItem.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${value}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${value} />
  `;
  todoItem.addEventListener('click', toggleTodoItem);
  todoItem.addEventListener('click', removeTodoItem);
  todoItem.addEventListener('dblclick', editTodoItem);
  todoItem.addEventListener('keydown', updateTodoItem);

  $todoList.appendChild(todoItem);

  $todoInput.value = '';
  $todoCount.innerText++;
}

$todoInput.addEventListener('keydown', addTodoItem);
