const inputToDo = document.querySelector("#new-todo-title");
const toDoList = document.querySelector(".todo-list");

let uniqueNumber = 0;
const TODO_LS = "todos";

function handleEnter(event) {
    if(event.key === 'Enter') {
        const inputText = inputToDo.value;
        addToDo(inputText);
        inputToDo.value = ""; 
    }
}

function addToDo(text) {
    const idValue = ++uniqueNumber;

    const li = document.createElement("li");
    li.id = idValue;
    
    const div = document.createElement("div");
    div.className = "view";
    
    const inputToogle = document.createElement("input");
    inputToogle.className = "toggle";
    inputToogle.type = "checkbox";
    inputToogle.id = idValue;
    inputToogle.addEventListener("click", checkToDo);

    const label = document.createElement("label");
    label.className = "label";
    label.innerHTML = text;

    const delBtn = document.createElement("button");
    delBtn.className = "destroy";
    delBtn.id = idValue;
    delBtn.addEventListener("click", deleteToDo);

    const inputEdit = document.createElement("input");
    inputEdit.className = "edit";
    inputEdit.value = text;

    li.appendChild(div);
    div.appendChild(inputToogle);
    div.appendChild(label);
    div.appendChild(delBtn);
    li.appendChild(inputEdit);

    toDoList.appendChild(li);
}

function checkToDo(event) {
    const inputToogle = event.target;
    const checkedState = inputToogle.getAttribute("checked");
    if(checkedState == null) {
    } else {
        inputToogle.checked = false;
    }

    const li = inputToogle.parentNode.parentNode;
    const completedState = li.className;
    if(completedState == "completed") {
        li.className = "false";
    } else {
        li.className = "completed";
    }
}

function deleteToDo(event) {
    const deleteBtn = event.target;
    const idValue = deleteBtn.id;
    const ul = document.querySelector("#todo-list");
    const liSize = ul.childNodes.length;
    for(let i = 0; i < liSize; i++) {
        if(ul.childNodes[i].id == idValue) {
            ul.removeChild(ul.childNodes[i]);
        }
    }
}

inputToDo.addEventListener("keypress", handleEnter);