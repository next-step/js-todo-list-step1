const $todoList = document.getElementById("todo-list");

export function initEditTodoItem(){
    $todoList.addEventListener("dblclick", EditTodoItem);
    $todoList.addEventListener("keyup", UpdateTodoItem);
}

export function EditTodoItem({target, key}){
    if(target && target.nodeName === 'LABEL'){ 
        //edit 모드로 변경
        const li = target.closest("li");
        li.classList.add("editing");
        li.querySelector(".edit").value = target.innerText;
    }
}

export function UpdateTodoItem({target, key}){
    const $editInput = document.querySelector(".edit");
    const li = target.closest("li");
    const editTitle = target.value;

    //enter 누르기 전 esc 누르면 -> 수정처리X
    if (key === 'Escape'){
        li.classList.remove("editing");
        return; 
    }

    if (key == "Enter" && editTitle !== ""){
        const label = target.parentNode.querySelector(".label");
        label.innerText = editTitle;

        target.closest("li").querySelector(".edit").value = editTitle;

        target.value = "";
        li.classList.remove("editing");
    }
}
