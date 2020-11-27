const newTodoTitle = document.getElementById('new-todo-title');
const todoList = document.getElementById('todo-list');

const addTodo = title => {
  const li = document.createElement('li');
  const view = document.createElement('div');
  const toggle = document.createElement('input');
  const label = document.createElement('label');
  const destroy = document.createElement('button');

  view.classList.add('view');
  toggle.classList.add('toggle');
  label.classList.add('label');
  destroy.classList.add('destroy');
  toggle.setAttribute('type', 'checkbox');
  label.innerText = title;

  view.append(toggle, label, destroy);
  li.append(view);
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

newTodoTitle.addEventListener('keydown', handleKeyDownNewTodoTitle);
todoList.addEventListener('click', handleClickTodoList);

addTodo('test1');
addTodo('test2');
