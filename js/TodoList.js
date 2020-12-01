const $todoTitle = document.getElementById('new-todo-title');
const $todoList = document.getElementById('todo-list');

$todoTitle.addEventListener("keyup", onAddTodoItem);

const ENTER_KEY = "Enter";

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  if(event.key === ENTER_KEY && todoTitle !== "") {
    // enter 키 입력 시 리스트 추가
    const div = document.createElement('div');
    div.className = "view";

    const list = document.createElement('li');
    list.className = "view";

    const input = document.createElement('input');
    input.className = "toggle";
    input.type = "checkbox";

    const label = document.createElement('label');
    label.className = "label";
    label.innerText = todoTitle;

    const button = document.createElement('button');
    button.className = "destroy";

    list.appendChild(input);
    list.appendChild(label);
    list.appendChild(button);
    div.appendChild(list);
    $todoList.appendChild(div);

    event.target.value = "";
  }
}