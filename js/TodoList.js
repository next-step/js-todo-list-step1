// const $todoList = document.getElementById('todo-list');
// const $todoFilter = document.querySelector('.filters');

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
    updateCount();
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