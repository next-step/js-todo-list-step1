const $newTodo = document.querySelector('#new-todo-title');
const $todoCount = document.querySelector('.todo-count strong');
const $filter = document.querySelector('.count-container .filters');
const $todoList = document.querySelector('#todo-list');
let timer;
let todoList;
let renderList;

let selection = 'all';
const init = () => {
  if (localStorage.getItem('todoList') === null) {
    localStorage.setItem('todoList', JSON.stringify([]));
    localStorage.setItem('todoId', 0);
  }
  render()
}
const updateCount = (nums) => {
  $todoCount.innerText = nums;

}
const render = () => {
  $todoList.innerHTML = '';
  todoList = JSON.parse(localStorage.getItem('todoList'));
  renderList = [...todoList];
  if (selection === 'active') {
    renderList = todoList.filter(todo => !todo.isComplete)
  } else if (selection === 'completed') {
    renderList = todoList.filter(todo => todo.isComplete)
  }
  updateCount(renderList.length);
  renderList.forEach(todo => renderTodo(todo))

}
const renderTodo = ({id, label, isComplete}) => {
  const todoHTML = `
        <li data-id=${id} class="${isComplete ? 'completed' : ''}" >
            <div class="view">
                <input class="toggle" type="checkbox" ${isComplete ? "checked" : ""}/>
                <label class="label">${label}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${label} />
        </li>    
    `
  $todoList.insertAdjacentHTML('beforeend', todoHTML);

}
const changeSelection = (e) => {
  const targetClass = e.target.classList;
  if (targetClass.contains(selection)) return false;
  $filter.querySelector('.' + selection).classList.remove('selected');
  selection = targetClass[0];
  targetClass.add('selected');
  render();

}
const createTodo = (e) => {
  const {target, key} = e;

  let todoId = localStorage.getItem('todoId');
  if (target.value.trim().length === 0) return false;
  if (key === 'Enter') {
    const todo = {
      id: todoId,
      label: target.value,
      isComplete: false,
    }
    todoList.push(todo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('todoId', ++todoId);
    target.value = '';
    render()
  }

}

let isEditMode = false;
const changeEditMode = (e) => {
  if (e.target.classList.contains('label')) {
    if (!isEditMode) {
      isEditMode = true;
      e.target.closest('li').classList.add('editing');
    }
  }

}

function escapeEditMode(target) {
  target.closest('li').classList.remove('editing');
  target.removeEventListener('keydown', updateTodo);
  isEditMode = false;
  render();

}

const updateTodo = ({target, key}) => {
  const id = target.closest('li').dataset.id;
  if (key === 'Enter') {
    todoList = todoList.map(todo => {
      if (todo.id === id) {
        todo.label = target.value;
      }
      return todo;
    })
    localStorage.setItem('todoList', JSON.stringify(todoList));
    escapeEditMode(target);

  }
  if (key === 'Escape') {
    escapeEditMode(target);
  }

}
const handleTodo = (e) => {
  e.stopPropagation();
  const target = e.target;

  const id = target.closest('li').dataset.id;
  if (target.classList.contains('toggle')) {
    todoList = todoList.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    })

  }
  if (target.classList.contains('edit')) {
    e.target.addEventListener('keydown', updateTodo)
    return;

  }
  if (target.classList.contains('destroy')) {
    todoList = todoList.filter(todo => todo.id !== id)

  }
  localStorage.setItem('todoList', JSON.stringify(todoList));
  render()

}
init();
$newTodo.addEventListener('keydown', createTodo);
$filter.addEventListener('click', changeSelection);
$todoList.addEventListener('click', e => {
  e.preventDefault();
  const isClickEvent = e.detail === 1;
  if (isClickEvent) {
      handleTodo(e)
    }

})
$todoList.addEventListener('dblclick', e => {
  console.log('11', e)
    changeEditMode(e)
})
