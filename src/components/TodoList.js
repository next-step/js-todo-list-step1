const todoItemTemplate = ({ id, value, isCompleted }) => `
  <li id="${id}" class="${isCompleted && 'completed'}">
    <div class="view">
      <input id="${id}" class="toggle" type="checkbox" ${isCompleted && 'checked'}/>
      <label class="label">${value}</label>
      <button id="${id}" class="destroy"></button>
    </div>
    <input class="edit" value=${value} />
  </li>
`;

export default function TodoList({ onToggle, onRemove, onUpdate }) {
  const $todoList = document.querySelector('#todo-list');

  $todoList.addEventListener('click', (event) => this.toggleTodoItem(event));
  $todoList.addEventListener('click', (event) => this.removeTodoItem(event));
  $todoList.addEventListener('dblclick', (event) => this.editTodoItem(event));
  $todoList.addEventListener('keydown', (event) => this.updateTodoItem(event));

  this.render = (todoItems) => {
    const template = todoItems.map(todoItemTemplate);
    $todoList.innerHTML = template.join('');
  };

  this.toggleTodoItem = (event) => {
    const toggleButtonTarget = event.target;
    if (!toggleButtonTarget.classList.contains('toggle')) return;

    const todoItem = toggleButtonTarget.closest('li');
    todoItem.classList.toggle('completed');
    toggleButtonTarget.toggleAttribute('checked');
    onToggle(toggleButtonTarget.id);
  };

  this.removeTodoItem = (event) => {
    const deleteButtonTarget = event.target;
    if (!deleteButtonTarget.classList.contains('destroy')) return;

    const todoItem = deleteButtonTarget.closest('li');
    todoItem.remove();
    onRemove(deleteButtonTarget.id);
  };

  this.editTodoItem = (event) => {
    const labelTarget = event.target;
    if (!labelTarget.classList.contains('label')) return;

    const todoItem = labelTarget.closest('li');
    todoItem.classList.toggle('editing');

    const editingInput = todoItem.querySelector('.edit');
    editingInput.focus();
    const { length } = editingInput.value;
    editingInput.setSelectionRange(length, length);
  };

  this.updateTodoItem = (event) => {
    const { key, target: editingInputTarget } = event;
    if (!editingInputTarget.classList.contains('edit')) return;

    const todoItem = editingInputTarget.closest('li');

    if (key === 'Escape') {
      todoItem.classList.remove('editing');
      return;
    }

    if (key !== 'Enter') return;

    const { value } = editingInputTarget;
    if (value === '') return;

    const label = todoItem.querySelector('.label');
    todoItem.classList.remove('editing');
    label.innerText = value;
    editingInputTarget.defaultValue = value;
    onUpdate(todoItem.id, value);
  };
}
