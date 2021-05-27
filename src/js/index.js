const $ = (selector = '') => document.querySelector(selector);

const $newTodoInput = $('#new-todo-title');
const $todoList = $('#todo-list');

function toggleItem(target) {
  const item = target.closest('li');
  item.classList.toggle('completed');
  target.toggleAttribute('checked');
}

function itemClickEventListener(event) {
  const { target } = event;
  if (target.classList.contains('toggle')) {
    toggleItem(target);
    return;
  }
}

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
  item.addEventListener('click', itemClickEventListener);

  $todoList.appendChild(item);
  $newTodoInput.value = '';
}

function newTodoInputKeydownEventListener(event) {
  if (event.key !== 'Enter') return;

  addItem();
}

$newTodoInput.addEventListener('keydown', newTodoInputKeydownEventListener);
