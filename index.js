const todoInput = document.querySelector('.new-todo');
const todoCount = document.querySelector('.todo-count strong');

let todos = [];

const drawTodo = (todoObj) => {
  const ul = document.querySelector('.todo-list');
  const li = document.createElement('li');
  li.id = todoObj.id;
  li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${todoObj.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todoObj.title}" />`
  ul.appendChild(li);
  const toggleBtn = li.querySelector('input');
  const delBtn = li.querySelector('button');
  const label = li.querySelector('label');
  toggleBtn.addEventListener('click', handleToggleClick);
  delBtn.addEventListener('click', handleDelBtnClick);
  label.addEventListener('dblclick', handleEditDoubleClick)
}

const createTodo = (inputValue) => {
  const todo = {
    id: todos.length + 1,
    title: inputValue
  };
  todos.push(todo);
  saveTodos();
  drawTodo(todo);
  countTodos();
}

const handleSubmit = (e) => {
  if (todoInput.value && e.keyCode === 13){
    createTodo(todoInput.value)
    todoInput.value = '';
  }
}

const handleToggleClick = (e) => {
  const targetInput = e.target;
  const targetLi = e.target.closest('li');
  targetInput.checked? e.target.setAttribute('checked', 'on') : e.target.removeAttribute('checked');
  targetLi.classList.toggle('completed');
}

const handleDelBtnClick = (e) => {
  // console.log(todos);
  const targetLi = e.target.closest('li');
  targetLi.parentNode.removeChild(targetLi);
  const id = e.target.closest('li').id;
  const result = todos.filter(todo => todo.id !== parseInt(id));
  todos = result;
  saveTodos();
  countTodos();
}

const handleEditDoubleClick = (e) => {
  const targetLabel = e.target;
  const targetLi = e.target.closest('li');
  const editInput = targetLabel.parentNode.nextElementSibling;
  targetLi.classList.add('editing');
  editInput.addEventListener('keyup', (e2) => {
    if (e2.keyCode === 27) {//esc
      targetLi.classList.remove('editing');
      editInput.value = targetLabel.innerHTML;
    }
    if (e2.keyCode === 13){//enter
      targetLi.classList.remove('editing');
      targetLabel.innerHTML = editInput.value;
      const theObj = todos.find(todo => todo.id === parseInt(targetLi.id));
      theObj.title = editInput.value;
      saveTodos();
    }
  });
}

const countTodos = () => {
  todoCount.innerHTML = todos.length;
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

const loadTodos = () => {
  const currentTodos = localStorage.getItem('todos');
  if (currentTodos) {
    const parsedTodos = JSON.parse(currentTodos);
    todos = parsedTodos;
    parsedTodos.map(todo => drawTodo(todo));
  }
  countTodos();
}

const init = () => {
  loadTodos();
  todoInput.addEventListener('keyup', handleSubmit);
}

init();