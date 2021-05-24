let count = 0;
const storage = window.localStorage;
const todoList = document.getElementById('todo-list');
let todoListStorage = [];

const filterList = ({ target }) => {
  let newTodoList = [];
  let todoItems = [...todoList.children];

  if (todoListStorage.length) {
    todoItems = todoListStorage;
  }

  if (target.className.includes('all')) {
    newTodoList = todoItems
      .filter((item) => item)
      .map((item) => `<li>${item.innerHTML}</li>`);
  }
  if (target.className === 'active') {
    newTodoList = todoItems
      .filter((item) => !item.children[0].children[0].checked)
      .map((item) => `<li>${item.innerHTML}</li>`);
  }
  if (target.className === 'completed') {
    newTodoList = todoItems
      .filter((item) => item.children[0].children[0].checked)
      .map((item) => `<li>${item.innerHTML}</li>`);
  }

  todoList.innerHTML = newTodoList;
  todoList.innerHTML = todoList.innerHTML.replaceAll(',', '');
  document.getElementsByClassName(
    'todo-count'
  )[0].children[0].innerHTML = parseInt(todoList.children.length, 10);
};

const filterAll = document.getElementsByClassName('all')[0];
const filterTodo = document.getElementsByClassName('active')[0];
const filterCompleted = document.getElementsByClassName('completed')[0];
filterAll.addEventListener('click', filterList);
filterTodo.addEventListener('click', filterList);
filterCompleted.addEventListener('click', filterList);

const handleCheckBox = ({ target }) => {
  const li = target.parentNode.parentNode;
  if (target.checked) {
    target.checked = true;
    li.classList.add('completed');
  } else {
    target.checked = false;
    li.classList.remove('completed');
  }
};

const deleteItem = ({ target }) => {
  const li = target.parentNode.parentNode;
  li.parentNode.removeChild(li);
  count = document.getElementsByClassName('todo-count')[0].children[0]
    .innerHTML;
  document.getElementsByClassName('todo-count')[0].children[0].innerHTML =
    parseInt(count, 10) - 1;
  todoListStorage = [...todoList.children];
};

const showHideDeleteButton = (e) => {
  if (e.target.tagName !== 'DIV') {
    return;
  }
  if (e.type === 'mouseover') {
    e.target.children[2].style.visibility = 'visible';
  }

  if (e.type === 'mouseleave') {
    e.target.children[2].style.visibility = 'hidden';
  }
};

const showEditInput = ({ target }) => {
  target.parentNode.children[3].value = target.innerHTML;
  target.parentNode.children[3].style.display = 'inline-block';
  target.parentNode.parentNode.classList.add('editing');
  target.parentNode.children[3].focus();
};

const editContent = (e) => {
  const value = e.target.value;
  if (e.key === 'Escape') {
    e.target.style.display = 'none';
    if (value === '') {
      e.target.parentNode.parentNode.classList.remove('editing');
      return;
    }
    e.target.parentNode.children[1].innerHTML = e.target.value;
    e.target.parentNode.parentNode.classList.remove('editing');
  }
};

const addItem = (e) => {
  const value = e.target.value;
  let checkBox;
  if (e.key === 'Enter') {
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.classList.add('item-container');
    li.appendChild(div);

    checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('check-box');
    checkBox.addEventListener('click', handleCheckBox);
    div.appendChild(checkBox);

    const content = document.createElement('span');
    content.classList.add('todo-content');
    content.innerHTML = value;
    content.addEventListener('dblclick', showEditInput);
    div.appendChild(content);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', deleteItem);
    div.addEventListener('mouseover', showHideDeleteButton);
    div.addEventListener('mouseleave', showHideDeleteButton);
    div.appendChild(deleteButton);

    const editInput = document.createElement('input');
    editInput.classList.add('edit-content');
    editInput.addEventListener('keydown', editContent);
    div.appendChild(editInput);

    todoList.appendChild(li);
    todoInput.value = '';

    count = document.getElementsByClassName('todo-count')[0].children[0]
      .innerHTML;
    document.getElementsByClassName('todo-count')[0].children[0].innerHTML =
      parseInt(count, 10) + 1;

    todoListStorage = [...todoList.children];
  }
};

const todoInput = document.querySelector('#new-todo-title');
todoInput.addEventListener('keypress', addItem);
