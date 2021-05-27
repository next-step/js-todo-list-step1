const $ = (selector = '') => document.querySelector(selector);

const $newTodoInput = $('#new-todo-title');
const $todoList = $('#todo-list');
const $todoCount = $('.todo-count');

function toggleItem(event) {
  const { target } = event;
  if (!target.classList.contains('toggle')) return;

  const item = target.closest('li');
  item.classList.toggle('completed');
  target.toggleAttribute('checked');
}

function removeItem(event) {
  const { target } = event;
  if (!target.classList.contains('destroy')) return;

  const item = target.closest('li');
  item.remove();

  const count = $todoCount.querySelector('strong');
  count.innerText--;
}

function editItem(event) {
  const { target } = event;
  if (!target.classList.contains('label')) return;

  const item = target.closest('li');
  item.classList.toggle('editing');

  const editingInput = item.querySelector('.edit');
  editingInput.focus();
  const { length } = editingInput.value;
  editingInput.setSelectionRange(length, length);
}

function updateItem(event) {
  const { key, target } = event;
  if (!target.classList.contains('edit')) return;

  const item = target.closest('li');

  if (key === 'Escape') {
    item.classList.remove('editing');
    return;
  }

  if (key !== 'Enter') return;

  const { value } = target;
  if (value === '') return;

  const label = item.querySelector('.label');
  item.classList.remove('editing');
  label.innerText = value;
  target.defaultValue = value;
}

function addItem(event) {
  if (event.key !== 'Enter') return;

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
  item.addEventListener('click', toggleItem);
  item.addEventListener('click', removeItem);
  item.addEventListener('dblclick', editItem);
  item.addEventListener('keydown', updateItem);

  $todoList.appendChild(item);
  $newTodoInput.value = '';

  const count = $todoCount.querySelector('strong');
  count.innerText++;
}

$newTodoInput.addEventListener('keydown', addItem);
