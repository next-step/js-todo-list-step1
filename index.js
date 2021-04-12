const todoInput = document.querySelector('.new-todo');
const todoCount = document.querySelector('.todo-count strong');
const activeTodosBtn = document.querySelector('.active');
const completedTodosBtn = document.querySelector('.completed');

let todos = [];

const paintTodo = (todoObj) => {
  // 그리기
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
  // 완료여부 상태대로 그리기
  toggleBtn.checked = (todos.find(todo => todo.id === (li.id))).completed;
  toggleBtn.checked? li.classList.add('completed') : li.classList.remove('completed');
  // 이벤트리스너들 부착
  toggleBtn.addEventListener('click', handleToggleClick);
  delBtn.addEventListener('click', handleDelBtnClick);
  label.addEventListener('dblclick', handleEditDoubleClick)
}

const createTodo = (inputValue) => {
  const todo = {
    id: Math.random().toString(36).substr(2, 9),
    title: inputValue,
    completed: false
  };
  todos.push(todo);
  saveTodos();
  paintTodo(todo);
  countTodos();
}

const handleSubmit = (e) => {
  if (todoInput.value && e.keyCode === 13){
    createTodo(todoInput.value)
    todoInput.value = '';
  }
}

const paintAsToggled = (targetLi, isCompleted) => {
  isCompleted? targetLi.setAttribute('checked', 'on') : targetLi.removeAttribute('checked');
  targetLi.classList.toggle('completed');
}

const handleToggleClick = (e) => {
  const targetLi = e.target.closest('li');
  const clickedTodoObj = todos.find(todo => todo.id === (targetLi.id));
  const isCompleted = clickedTodoObj.completed;
  paintAsToggled(targetLi, isCompleted);
  // 토글결과 localStorage에도 저장
  clickedTodoObj.completed = !clickedTodoObj.completed;
  saveTodos();
}

const handleDelBtnClick = (e) => {
  const targetLi = e.target.closest('li');
  targetLi.parentNode.removeChild(targetLi);
  const id = e.target.closest('li').id;
  const result = todos.filter(todo => todo.id !== (id));
  todos = result;
  saveTodos();
  countTodos();
}

const handleEditDoubleClick = (e) => {
  const targetLabel = e.target;
  const targetLi = e.target.closest('li');
  const editInput = targetLabel.parentNode.nextElementSibling;
  targetLi.classList.add('editing');
  // 수정하다가 esc와 enter 누르는 것에 따라 로직처리
  editInput.addEventListener('keyup', (e2) => {
    if (e2.keyCode === 27) {//esc
      targetLi.classList.remove('editing');
      editInput.value = targetLabel.innerHTML;
    }
    if (e2.keyCode === 13){//enter
      targetLi.classList.remove('editing');
      targetLabel.innerHTML = editInput.value;
      const theObj = todos.find(todo => todo.id === (targetLi.id));
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
    parsedTodos.map(todo => paintTodo(todo));
  }
  countTodos();
}

const init = () => {
  loadTodos();
  todoInput.addEventListener('keyup', handleSubmit); //인풋 입력하고 엔터 누를 시 submit
  activeTodosBtn.addEventListener('click', () => console.log('hey'));
}

init();