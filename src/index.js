const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector(".toggle-all");
const $todoList = document.querySelector(".todo-list");
const $todoCount = document.querySelector(".todo-count");
const $todoCountStrong = $todoCount.querySelector("strong");

function useState(initState) {
  
  const setState = newState => {
    state = newState;
    console.log(state)
  }
  return [state, setState]
}

function init() {
  let [state, setState] = useState("asdasd");

  const todoList = [];

  const setTodoList = value => {
    todoList.push(value);
  }

  $todoInput.addEventListener("keydown", e => {
    if(e.key === 'Enter') {
      console.log(e.key)
      setTodoList(TodoItem(state));
      e.target.value = "";
      addTodoList(todoList);
      todoCounting(todoList);
    }
    addTodo(e.target.value, setState);
  });

  $todoList.addEventListener("click", (e)=> {
    e.target.closest("li").classList.toggle("completed");
  })

}

function TodoItem(content) {
  // 여기에 상태를 저장할 수 있는 state를 만들어야 함.
  return `
  <li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">${content}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
  </li>`
}

function addTodo(data, setValue) {
  setValue(data);
}

function todoCounting(todolist) {
  $todoCountStrong.innerHTML = todolist.length
}

function addTodoList(todo) {
  const template = todo 
  $todoList.insertAdjacentHTML('beforeend', template[todo.length-1]);
  // $todoList.innerHTML = template.join("");
}


init();