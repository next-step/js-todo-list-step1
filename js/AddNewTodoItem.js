const $todoInput = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");

//export : 내보낸 값을 다른 프로그램에서 import문으로 가져다 사용 가능
export function initAddNewTodoItem(){
    $todoInput.addEventListener("keyup", AddNewTodoList); 
}

export function AddNewTodoList(e){
    const todoTitle = e.target.value;
    if (e.key === "Enter" && todoTitle !== "") 
    {
        const inputList = listTemplate(todoTitle);
        $todoList.insertAdjacentHTML("beforeend", inputList);
        e.target.value = "";

    }
    document.querySelector("strong").innerText = document.querySelectorAll("#todo-list li").length;
}

export function listTemplate(title) {
    return ` <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label class="label">${title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${title}">
            </li>`;
}