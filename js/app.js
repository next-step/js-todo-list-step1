const KEYCODE_ENTER = 13;

const $newTodo = document.getElementById('new-todo-title');
const $todoList = document.getElementById('todo-list');

$newTodo.addEventListener('keypress', e => {
  if (e.keyCode === KEYCODE_ENTER) {
    const size = $todoList.childElementCount;
    const list = `${$todoList.innerHTML}<li><input type="checkbox" id="${size}" class="toggle"><label for="${size}">${e.target.value}</label></li>`;
    $todoList.innerHTML = list;
    $newTodo.value = '';
  }
});