const $ = (selector = '') => document.querySelector(selector);

const $newTodoInput = $('#new-todo-title');
const $todoList = $('#todo-list');

function addItem() {
  const { value } = $newTodoInput;
  if (value === '') return;

  const item = document.createElement('li');
  item.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${value}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${value} />
  `;

  $todoList.appendChild(item);
  $newTodoInput.value = '';
}

function newTodoInputKeydownEventListener(event) {
  if (event.key !== 'Enter') return;

  addItem();
}

$newTodoInput.addEventListener('keydown', newTodoInputKeydownEventListener);
