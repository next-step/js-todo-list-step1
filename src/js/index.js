const $ = (selector = '') => document.querySelector(selector);

const $newTodoInput = $('#new-todo-title');
const $todoList = $('#todo-list');

function toggleItem(item, toggleButton) {
  item.classList.toggle('completed');
  toggleButton.toggleAttribute('checked');
}

function itemClickEventListener(event) {
  const { target } = event;
  const item = target.closest('li');

  if (target.classList.contains('toggle')) {
    toggleItem(item, target);
    return;
  }

  if (target.classList.contains('destroy')) {
    item.remove();
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
