const $todoList = document.getElementById("todo-list");

export function initControlTodoItem(){
    $todoList.addEventListener("click", onToggleTodoItem);
}

//완료한 일로 check, 할 일 삭제 : edit모드에서는 작동X
function onToggleTodoItem({target}) {
    const li = target.closest("li");

    //완료된 일 
    if(target && target.nodeName === 'INPUT'){ 
        target.closest("li").classList.toggle("completed");
    }

    //삭제
    if(target && target.nodeName === 'BUTTON'){
        var returnValue = confirm('정말로 삭제하시겠습니까?');
        if(returnValue === true){
            li.parentNode.removeChild(li);
        }
        document.querySelector("strong").innerText = document.querySelectorAll("#todo-list li").length;
    }
}