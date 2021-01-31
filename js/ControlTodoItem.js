import {countList} from './AddNewTodoItem.js';
const $todoList = document.getElementById("todo-list");

export function initControlTodoItem(){
    $todoList.addEventListener("click", onToggleTodoItem);
}

//완료한 일로 check, 할 일 삭제 : edit모드에서는 작동X
function onToggleTodoItem({target}) {
    const li = target.closest("li");

    if(target){
        if(target.nodeName === 'INPUT'){ 
            li.classList.toggle("completed");
        }else if(target.nodeName === 'BUTTON' && confirm('정말로 삭제하시겠습니까?')){
            li.parentNode.removeChild(li);
            countList();
        }
    }
}