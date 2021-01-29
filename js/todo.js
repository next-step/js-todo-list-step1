'ues strict';
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filters');

const filterNames = ['all', 'active', 'completed'];

function init() {
  todoInput.addEventListener('keyup', event => {
    addTodoItem(event);
  });
  todoList.addEventListener('click', event => {
    toggleTodoItem(event);
    deleteTodoItem(event);
    onClickFilter(event);
  });
  filter.addEventListener('click', event => {
    onClickFilter(event);
  });
}

function addTodoItem(event) {
  const todoTitle = event.target.value;
  if (event.key !== 'Enter' || todoTitle === '') {
    return;
  }
  console.log('addTodoItem() called');
  todoList.append(createTodoTemplete(todoTitle));
  event.target.value = '';
}

function createTodoTemplete(title) {
  console.log('createTodoTemplete() called');
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
  // check target
  if (event.target.className !== 'destroy') {
    return;
  }
  console.log('deleteTodoItem() called');
  const todoItem = event.target.closest('li');

  todoItem.remove();
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

function onClickFilter(event) {
  const filterName = event.target.classList[0];
  if (!filterNames.includes(filterName)) {
    return;
  }
  console.log('countTodoItem() called');
  const todoCountText = document.querySelector('.todo-count>strong');
  const totalNumber = document.querySelectorAll('.todo-list li').length;
  const completedNumber = document.querySelectorAll('.todo-list li.completed')
    .length;
  switch (filterName) {
    case 'all':
      console.log('all');
      todoCountText.innerHTML = totalNumber;
      break;
    case 'active':
      console.log('active');
      todoCountText.innerHTML = totalNumber - completedNumber;
      break;
    case 'completed':
      console.log('completed');
      todoCountText.innerHTML = completedNumber;
      break;
  }
}

console.log(document.querySelector('a').classList[0]);
init();
