const $todoList = document.getElementById("todo-list");

export function initEditTodoItem(){
    $todoList.addEventListener("dblclick", EditTodoItem);
    $todoList.addEventListener("keyup", UpdateTodoItem);
}

export function EditTodoItem({target}){
    if(target && target.nodeName === 'LABEL'){ 
        //edit 모드로 변경
        const $li = target.closest("li");
        $li.classList.add("editing");
    }
}

export function UpdateTodoItem({target, key}){
    const $li = target.closest("li");
    const $editTitle = target.value;

    //enter 누르기 전 esc 누르면 -> 수정처리X
    if (key === 'Escape'){
        target.value = $li.querySelector("label").innerText;
        $li.classList.remove("editing");
        return; 
    }

    if (key == "Enter" && $editTitle !== ""){
        const label = $li.querySelector(".label");
        label.innerText = $editTitle;
        target.value = $editTitle;
        $li.classList.remove("editing");
    }
}
