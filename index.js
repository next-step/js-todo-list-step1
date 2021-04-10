const todoInput = document.querySelector('.new-todo');
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
  label.addEventListener('dblclick', handleEdit)
}

const createTodo = (inputValue) => {
  const todo = {
    id: todos.length + 1,
    title: inputValue
  };
  todos.push(todo);
  drawTodo(todo);
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
}

const handleEdit = (e) => {
  const targetLabel = e.target;
  const targetLi = e.target.closest('li');
  const editInput = targetLabel.parentNode.nextElementSibling;
  targetLi.classList.add('editing');
  editInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
      targetLi.classList.remove('editing');
    }
    if (e.keyCode === 13){
      // console.log(e.target.value, editInput.value);
      e.target.innerHTML = editInput.value;
      targetLi.classList.remove('editing');
    }
  });
}

const init = () => {
  todoInput.addEventListener('keyup', handleSubmit);
}

init();