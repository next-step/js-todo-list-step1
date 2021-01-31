const $todoInput = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");

export function initAddNewTodoItem(){
    $todoInput.addEventListener("keyup", AddNewTodoList); 
}

//새로운 todolist를 생성하여 HTML에 삽입한다. 
export function AddNewTodoList(e){
    const todoTitle = e.target.value;
    if (e.key === "Enter" && todoTitle !== "") 
    {
        const inputList = todoTemplate(todoTitle);
        $todoList.insertAdjacentHTML("beforeend", inputList);
        e.target.value = "";

    }
    document.querySelector("strong").innerText = document.querySelectorAll("#todo-list li").length;
}

export function todoTemplate(title) {
    return ` <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label class="label">${title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${title}">
            </li>`;
}