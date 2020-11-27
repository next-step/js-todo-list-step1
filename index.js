const newTodoTitle = document.getElementById('new-todo-title');
const todoList = document.getElementById('todo-list');

const addTodo = title => {
  const li = document.createElement('li');
  const view = document.createElement('div');
  const toggle = document.createElement('input');
  const label = document.createElement('label');
  const destroy = document.createElement('button');
  const edit = document.createElement('input');

  view.classList.add('view');
  toggle.classList.add('toggle');
  label.classList.add('label');
  destroy.classList.add('destroy');
  edit.classList.add('edit');
  toggle.setAttribute('type', 'checkbox');
  label.innerText = title;
  edit.setAttribute('value', title);

  view.append(toggle, label, destroy);
  li.append(view, edit);
  todoList.append(li);
};

const handleKeyDownNewTodoTitle = e => {
  const title = e.target.value;
  if (e.key === 'Enter' && title) {
    addTodo(title);
    e.target.value = '';
  }
};

const handleClickTodoList = e => {
  if (e.target.tagName === 'INPUT') {
    toggleComplete(e.target);
  } else if (e.target.tagName === 'BUTTON') {
    destroyTodo(e.target);
  }
};

const toggleComplete = target => {
  const input = target;
  const li = input.parentNode.parentNode;
  li.classList.toggle('completed');
};

const destroyTodo = target => {
  const button = target;
  const li = button.parentNode.parentNode;
  li.remove();
};

const handleDblClickTodoList = e => {
  if (e.target.tagName === 'LABEL') {
    editTodo(e.target);
  }
};

const editTodo = target => {
  const label = target;
  const li = label.parentNode.parentNode;
  const edit = li.querySelector('.edit');
  li.classList.add('editing');
  edit.focus();
};

const handleKeydownTodoList = e => {
  if (e.target.tagName === 'INPUT' && e.key === 'Escape') {
    escapeEdit(e.target);
  } else if (e.target.tagName === 'INPUT' && e.key === 'Enter') {
    updateTodo(e.target);
  }
};

const escapeEdit = target => {
  const input = target;
  const li = input.parentNode;
  li.classList.remove('editing');
};

const updateTodo = target => {
  const input = target;
  const li = input.parentNode;
  const label = li.querySelector('div > label');
  label.innerText = input.value;
  li.classList.remove('editing');
};

newTodoTitle.addEventListener('keydown', handleKeyDownNewTodoTitle);
todoList.addEventListener('click', handleClickTodoList);
todoList.addEventListener('dblclick', handleDblClickTodoList);
todoList.addEventListener('keydown', handleKeydownTodoList);

addTodo('test1');
addTodo('test2');
