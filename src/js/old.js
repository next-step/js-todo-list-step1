// Selectors
const todoInput = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
const todoCount = document.querySelector('.todo-count strong');
const todoFilter = document.querySelector('.filters');

// Event Listeners
todoInput.addEventListener('keyup', addTodo);
todoList.addEventListener('click', clickTodo);
todoList.addEventListener('dblclick', dblclickTodo);
todoList.addEventListener('keyup', editTodo);
todoFilter.addEventListener('click', filterTodo);

// Global Variable
let totalCount = 0;

// Functions
function makeElem(type, parentNode, className = '') {
  const elem = document.createElement(type);
  parentNode.appendChild(elem);
  if (className != '') elem.classList.add(className);
  return elem;
}

function addTodo(e) {
  if (e.key === 'Enter' && todoInput.value) {
    // event.preventDefault();
    const newTodo = makeElem('li', todoList, 'false');
    const todoDiv = makeElem('div', newTodo, 'view');
    const todoCheck = makeElem('input', todoDiv, 'toggle');
    const todoLabel = makeElem('label', todoDiv, 'label');
    const todoDelete = makeElem('button', todoDiv, 'destroy');
    const todoEdit = makeElem('input', newTodo, 'edit');
    todoCheck.setAttribute('type', 'checkbox');
    todoCheck.setAttribute('false', '');
    todoLabel.innerText = todoInput.value;
    todoEdit.setAttribute('value', todoInput.value);
    todoInput.value = '';
    totalCount += 1;
    todoCount.innerText = String(totalCount);
  }
}

function clickTodo(e) {
  const item = e.target;

  if (item.classList[0] === 'toggle') {
    if (item.hasAttribute('false')) {
      item.removeAttribute('false');
      item.setAttribute('checked', '');
      item.parentNode.parentNode.classList.replace('false', 'completed');
    } else {
      item.removeAttribute('checked');
      item.setAttribute('false', '');
      item.parentNode.parentNode.classList.replace('completed', 'false');
    }
  } else if (item.classList[0] === 'destroy') {
    totalCount -= 1;
    todoCount.innerText = String(totalCount);
    item.parentNode.parentNode.remove();
  }
}

function dblclickTodo(e) {
  const item = e.target;

  if (item.classList[0] === 'label') {
    item.parentNode.parentNode.classList.add('editing');
  }
}

function editTodo(e) {
  const item = e.target;

  // e.preventDefault();
  // console.log(item);
  // console.log(e.key);
  // console.log(e.keyCode);

  if (e.key === 'Escape') {
    const todoLabel = item.parentNode.childNodes[0].childNodes[1];
    item.value = todoLabel.innerText;
    item.parentNode.classList.remove('editing');
  }
  // else if (e.key === "Enter" && item.parentNode.hasAttribute('editing')) {
  else if (e.key === 'Enter') {
    // 이렇게 해도 되나?
    const todoLabel = item.parentNode.childNodes[0].childNodes[1]; // 이런 식 말고 다른 방법 없나?
    item.innerText = item.value;
    todoLabel.innerText = item.value;
    item.parentNode.classList.remove('editing');
  }
}

function filterTodo(e) {
  const item = e.target;
  let viewCount = 0;

  if (item.classList.contains('all')) {
    for (let i = 0; i < totalCount; i++) {
      todoList.childNodes[i].style.display = 'block';
    }
    document.querySelector('.filters .all').classList.add('selected'); // 왜 "a .active"는 안될까?
    document.querySelector('.filters .active').classList.remove('selected');
    document.querySelector('.filters .completed').classList.remove('selected');
    todoCount.innerText = String(totalCount);
  } else if (item.classList.contains('active')) {
    for (let i = 0; i < totalCount; i++) {
      if (todoList.childNodes[i].classList.contains('completed')) {
        todoList.childNodes[i].style.display = 'none';
      } else {
        todoList.childNodes[i].style.display = 'block';
        viewCount++;
      }
    }
    document.querySelector('.filters .all').classList.remove('selected');
    document.querySelector('.filters .active').classList.add('selected');
    document.querySelector('.filters .completed').classList.remove('selected');
    todoCount.innerText = String(viewCount);
  } else if (item.classList.contains('completed')) {
    for (let i = 0; i < totalCount; i++) {
      if (todoList.childNodes[i].classList.contains('false')) {
        todoList.childNodes[i].style.display = 'none';
      } else {
        todoList.childNodes[i].style.display = 'block';
        viewCount++;
      }
    }
    document.querySelector('.filters .all').classList.remove('selected');
    document.querySelector('.filters .active').classList.remove('selected');
    document.querySelector('.filters .completed').classList.add('selected');
    todoCount.innerText = String(viewCount);
  }
}
