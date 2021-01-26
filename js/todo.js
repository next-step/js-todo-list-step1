// const main = document.querySelector('main');
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
// const toggle = document.querySelector('.toggle');

function init() {
  showNumberOfTotalItems();
  // main.addEventListener('change', showNumberOfTotalItems);
  todoInput.addEventListener('keyup', addTodoItem);
  todoInput.addEventListener('keyup', showNumberOfTotalItems);
  todoList.addEventListener('click', toggleTodoItem);
  todoList.addEventListener('click', deleteTodoItem);
  todoList.addEventListener('click', showNumberOfTotalItems);
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

function showNumberOfTotalItems(event) {
  console.log('showNumberOfTotalItems() called');
  // check target
  // if () {
  //   return;
  // }
  const numberOfItems = todoList.querySelectorAll('li').length;
  const totalNumber = document
    .querySelector('.todo-count')
    .querySelector('strong');

  totalNumber.innerHTML = numberOfItems;
}

function showNumberOfTodoItems() {
  console.log('showTodoItem() called');
  console.log(todoList.querySelectorAll('.completed').length);

  const totalNumber = todoList.querySelectorAll('li').length;
  const completedNumber = todoList.querySelectorAll('.completed').length;
  const todoNumber = totalNumber - completedNumber;
}

function showNumberOfCompletedItems() {
  console.log('showTodoItem() called');
  const number = todoList.querySelectorAll('.completed').length;
}

function clickTodoCount() {}

init();
