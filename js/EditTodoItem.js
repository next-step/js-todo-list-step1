const $todoList = document.getElementById("todo-list");

export function initEditTodoItem(){
    $todoList.addEventListener("dblclick", EditTodoItem);
    $todoList.addEventListener("keyup", UpdateTodoItem);
}

export function EditTodoItem(e){
    if(e.target && e.target.nodeName === 'LABEL'){ 
        //edit 모드로 변경
        const li = e.target.closest("li");
        li.classList.add("editing");
        li.querySelector(".edit").value = e.target.innerText;
    }
}

export function UpdateTodoItem(e){
    const $editInput = document.querySelector(".edit");
    const li = e.target.closest("li");
    const editTitle = e.target.value;

    //enter 누르기 전 esc 누르면 -> 수정처리X
    if (e.key === 'Escape'){
        li.classList.remove("editing");
        return; 
    }

    if (e.key == "Enter" && editTitle !== ""){
        const label = e.target.parentNode.querySelector(".label");
        label.innerText = editTitle;

        e.target.closest("li").querySelector(".edit").value = editTitle;

        e.target.value = "";
        li.classList.remove("editing");
    }
}
