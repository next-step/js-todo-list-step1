const $todoTitle = document.getElementById('new-todo-title');
const $todoList = document.getElementById('todo-list');

$todoTitle.addEventListener("keyup", onAddTodoItem);

const ENTER_KEY = "Enter";

function toggleItem(event) {
  const target = event.target;
  const list = target.parentElement.parentElement;
  list.classList.toggle('completed');
  target.classList.toggle('checked');  
}

function removeTodoItem(event) {
  const target = event.target;
  const list = target.parentElement.parentElement;
  $todoList.removeChild(list);
}

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  if(event.key === ENTER_KEY && todoTitle !== "") {
    // enter 키 입력 시 리스트 추가
    const div = document.createElement('div');
    div.className = "view";

    const list = document.createElement('li');
    const input = document.createElement('input');
    input.className = "toggle";
    input.type = "checkbox";
    input.addEventListener("click", toggleItem);

    const label = document.createElement('label');
    label.className = "label";
    label.innerText = todoTitle;

    const button = document.createElement('button');
    button.className = "destroy";
    button.addEventListener("click", removeTodoItem);

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(button);
    list.appendChild(div);
    $todoList.appendChild(list);

    event.target.value = "";
  }
}
