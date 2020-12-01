const $todoTitle = document.getElementById('new-todo-title');
const $todoList = document.getElementById('todo-list');

$todoTitle.addEventListener("keyup", onAddTodoItem);

const ENTER_KEY = "Enter";
const ESC_KEY = "Escape";

function toggleItem(event) {
    const target = event.target;
    const list = target.parentElement.parentElement;
    list.classList.toggle('completed');
    event.target.removeEventListener("dblclick", showEditor);
    target.classList.toggle('checked');  
  }
  
function removeTodoItem(event) {
if (confirm("정말 삭제하시겠습니까?")){
    const target = event.target;
    const list = target.parentElement.parentElement;
    $todoList.removeChild(list);
    }else{
        return;
    }
}
    
function showEditor(event) {
    const div = event.target.parentElement;
    const list = div.parentElement;
    list.classList.add('editing');

    // editor 생성
    const todoInput = document.createElement('input');
    todoInput.className = "edit";
    todoInput.value = list.textContent;
    list.appendChild(todoInput);

    todoInput.addEventListener("keyup", closeEditor);
}

function closeEditor(event) {
    const target = event.target; // edit
    const list = target.parentElement; // editing

    if (event.key === ENTER_KEY) {
    list.querySelector('label').textContent = target.value;
    list.classList.remove('editing');
    list.removeChild(target);
    } else if (event.key == ESC_KEY) {
    list.classList.remove('editing');
    list.removeChild(target);
    }
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

    label.addEventListener("dblclick", showEditor); // todo list를 더블클릭했을 때 input 모드로 변경

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