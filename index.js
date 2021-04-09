const handleSubmit = (e) => {
  e.preventDefault();
  console.log('hey')
  // console.log(todoInput.value);
}
const todoInput = document.querySelector('form');
todoInput.addEventListener('submit', handleSubmit)

const createTodo = () => {
  const ul = document.querySelector('.todo-list');
  const li = document.createElement('li');
  li.innerHTML = `
    <li>
      <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">새로운 타이틀</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="새로운 타이틀" />
    </li>`
  ul.appendChild(li);
}

const init = () => {
  createTodo();
}

init();