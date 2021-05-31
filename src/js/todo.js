const inputToDo = document.querySelector("#new-todo-title");
const toDoList = document.querySelector(".todo-list");

const TODO_LS = "todos";

function handleEnter(event) {
    if(event.key === 'Enter') {
        const inputText = inputToDo.value;
        addToDo(inputText);
        inputToDo.value = ""; 
    }
}

function addToDo(text) {
    const li = document.createElement("li");
    
    const div = document.createElement("div");
    div.className = "view";
    
    const inputToogle = document.createElement("input");
    inputToogle.className = "toggle";
    inputToogle.type = "checkbox";

    const label = document.createElement("label");
    label.className = "label";
    label.innerHTML = text;

    const button = document.createElement("button");
    button.className = "destory";

    const inputEdit = document.createElement("input");
    inputEdit.className = "edit";
    inputEdit.value = text;

    li.appendChild(div);
    div.appendChild(inputToogle);
    div.appendChild(label);
    div.appendChild(button);
    li.appendChild(inputEdit);

    toDoList.appendChild(li);
}

inputToDo.addEventListener("keypress", handleEnter);