const insertTodo = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
const todosCount = document.querySelector('.todo-count');
const todoState = document.querySelector('.filters');
const items = JSON.parse(localStorage.getItem('items')) || [];

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function addTodoItem() {
  const todoId = (items.length > 0) ? items[items.length - 1].id + 1 : 1;

  item = {
    id: todoId,
    text: this.value,
    done: false
  };

  items.push(item);
  setStorage('items', items);
  itemList(items, todoList);

  this.value = '';
}

function removeTodoItem() {
  const targetEl = this;
  const index = parseInt(targetEl.parentNode.parentNode.dataset.index);
  const removeIndex = items.findIndex(item => parseInt(item.id) === index);

  items.splice(removeIndex, 1);
  setStorage('items', items);
  itemList(items, todoList);

  todosCount.querySelector('strong').innerText = todoList.children.length;
}

function handleEditTodo(e) {
  const parentEl = e.target.parentNode.parentNode;
  parentEl.classList.toggle('editing');
  const currentText = parentEl.querySelector('label').innerText;
  const inputEl = document.createElement('input');
  
  if (parentEl.classList.contains('editing')) {
    parentEl.appendChild(inputEl).classList.add('edit');
  }

  const editEl = parentEl.querySelector('.edit');

  editEl.value = currentText;
  editEl.addEventListener('keydown', saveChangeText);
  editEl.addEventListener('change', saveChangeText);
}

const saveChangeText = (e) => {
  const changeItems = [...items];
  const parentEl = e.target.parentNode;
  const changeText = e.target.value;
  const todoLabel = parentEl.querySelector('label');

  if (e.key === 'Escape' || e.key === 'Enter') {
    if (e.key === 'Enter') {
      todoLabel.innerText = changeText;

      const [changeItem] = changeItems.filter(item => item.id === parseInt(parentEl.dataset.index));
      changeItem.text = changeText;
      items.splice(parseInt(parentEl.dataset.index) - 1, changeItem);

      setStorage('items', items);
    }

    parentEl.classList.remove('editing');
    e.target.remove();
  }
}

const toggleDone = (e) => {
  
  const parentEl = e.target.parentNode.parentNode;
  const index = items.findIndex(item => item.id === parseInt(parentEl.dataset.index));

  items[index].done = !items[index].done;
  (e.target.checked) ? parentEl.classList.add('completed') : parentEl.classList.remove('completed');

  localStorage.setItem('items', JSON.stringify(items));
}

function selectedStateTodo(e) {
  if (!e.target.matches('a')) return;

  const states = todoState.querySelectorAll('a');
  const className = e.target.classList;

  states.forEach(state => state.classList.remove('selected'));
  className.add('selected');
  itemList(items, todoList, className[0]);
}

function stateCheck(todos, state) {
  switch (state) {
    case 'active':
      return todos.filter(todo => !todo.done);

    case 'completed':
      return todos.filter(todo => todo.done);
  
    default:
      return todos;
  }
}

const itemList = (todos=[], todoEl, state='all') => {
  const resetTodos = stateCheck(todos, state);
  const resetCount = resetTodos.length;

  todoEl.innerHTML = resetTodos.map(item => (
    `
      <li data-index=${item.id} class=${item.done ? 'completed' : ''}>
        <div class="view">
          <input type="checkbox" class="toggle" id="item${item.id}" ${item.done ? 'checked' : ''} />
          <label for="item${item.id}">${item.text}</label>
          <button class="destroy"></button>
        </div>
      </li>
    `
  )).join('');

  todosCount.querySelector('strong').innerText = resetCount;
  todoEl.querySelectorAll('.destroy').forEach(button => button.addEventListener('click', removeTodoItem));
  todoList.querySelectorAll('label').forEach(item => item.addEventListener('dblclick', handleEditTodo));
  todoList.querySelectorAll('input[type="checkbox"]').forEach(item => item.addEventListener('click', toggleDone));
}

itemList(items, todoList);
insertTodo.addEventListener('change', addTodoItem);
todoState.addEventListener('click', selectedStateTodo);
