const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
// const toggle = document.querySelector('.toggle');

function init() {
  todoInput.addEventListener('keyup', addTodoItem);
  todoList.addEventListener('click', toggleTodoItem);
  todoList.addEventListener('click', deleteTodoItem);
}

function addTodoItem(event) {
  console.log('addTodoItem() called');
  const todoTitle = event.target.value;

  if (event.key === 'Enter' && todoTitle !== '') {
    todoList.appendChild(createTodoItem(todoTitle));
    event.target.value = '';
  }
}

function createTodoItem(title) {
  console.log('createTodoItem() called');
  const li = document.createElement('li');
  const div = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const button = document.createElement('button');

  // set elements
  div.setAttribute('class', 'view');
  input.setAttribute('class', 'toggle');
  input.setAttribute('type', 'checkbox');
  label.setAttribute('class', 'label');
  label.innerHTML = `${title}`;
  button.setAttribute('class', 'destroy');
  // combine elements
  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(button);
  li.appendChild(div);
  return li;
}

function deleteTodoItem(event) {
  console.log('deleteTodoItem() called');
  // check target
  if (event.target.classList.item(0) !== 'destroy') {
    return;
  }
  const todoItem = event.target.closest('li');

  todoItem.remove();
}

function toggleTodoItem(event) {
  console.log('toggleTodoItem() called');
  // check target
  if (event.target.classList.item(0) !== 'toggle') {
    return;
  }
  const li = event.target.closest('li');

  li.classList.toggle('completed');
}

init();
