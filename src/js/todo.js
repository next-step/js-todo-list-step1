const inputToDo = document.querySelector("#new-todo-title");
const toDoList = document.querySelector(".todo-list");
const toDoCount = document.querySelector(".todo-count");
const filters = document.querySelector(".filters");
const filtersAll = document.querySelector(".all");
const filtersToDo = document.querySelector(".active");
const filtersCompleted = document.querySelector(".completed");

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
    li.addEventListener("dblclick", editToDo);
    
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
    showAllNumber();
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
            break;
        }
    }
    if(filtersAll.classList.contains("selected")) {
        showAllNumber()
    }

    if(filtersCompleted.classList.contains("selected")) {
        showCompletedNumber();
    }
    
    if(filtersToDo.classList.contains("selected")) {
        showActiveNumber();
    }
}

function editToDo(event) {
    const label = event.target;
    const li = label.parentNode.parentNode;
    li.className = "editing";
    li.addEventListener("keydown", finishEditToDo);
}

function finishEditToDo(event) { 
    if(event.key === 'Enter') {
        const inputEdit = event.target;
        const editText = inputEdit.value;

        const label = inputEdit.previousSibling.childNodes[1];
        label.innerHTML = editText;
        const li = inputEdit.parentNode;
        li.className = "false";
    }

    if(event.key === 'Escape') {
        const inputEdit = event.target;
        const li = inputEdit.parentNode;
        li.className = "false";
    }
}

function changeFilter(event) {
    const target = event.target;
    const liList = filters.getElementsByTagName("li");
    for(let i=0 ; i<liList.length; i++) {
        if(liList[i].firstElementChild.classList.contains("selected")) {
            liList[i].firstElementChild.classList.remove("selected");
            break;
        }
    }
    target.classList.add("selected");

    const targetClassList = target.classList;
    const liToDoList = toDoList.getElementsByTagName("li");
    if(targetClassList.contains("all")) {
        for(let i=0; i<liToDoList.length; i++) {
            liToDoList[i].style.display = "block";   
        }
        showAllNumber();
    }
    
    if(targetClassList.contains("active")) {
        for(let i=0; i<liToDoList.length; i++) {
            const liClassListName = liToDoList[i].classList;
            if(!liClassListName.contains("completed")) {
                liToDoList[i].style.display = "block";
            } else {
                liToDoList[i].style.display = "none";
            }
        }
        showActiveNumber();
    }
    
    if(targetClassList.contains("completed")) {
        for(let i=0; i<liToDoList.length; i++) {
            const liClassListName = liToDoList[i].classList;
            if(liClassListName.contains("completed")) {
                liToDoList[i].style.display = "block";
            } else {
                liToDoList[i].style.display = "none";
            }
        }
        showCompletedNumber();
    }
}

function showAllNumber() {
    const liList = toDoList.childNodes;
    const strong = toDoCount.firstChild.nextSibling;
    strong.innerHTML = liList.length;
}

function showActiveNumber() {
    let activeNumber = 0;
    const liList = toDoList.childNodes;
    for(let i=0; i<liList.length; i++) {
        if(liList[i].style.display === 'block') {
            activeNumber++;
        }
    }
    const strong = toDoCount.firstChild.nextSibling;
    strong.innerHTML = activeNumber;
}

function showCompletedNumber() {
    let completedNumber = 0;
    const liList = toDoList.childNodes;
    for(let i=0; i<liList.length; i++) {
        if(liList[i].style.display === 'block') {
            completedNumber++;
        }
    }
    const strong = toDoCount.firstChild.nextSibling;
    strong.innerHTML = completedNumber;
}

inputToDo.addEventListener("keypress", handleEnter);
filtersAll.addEventListener("click", changeFilter);
filtersToDo.addEventListener("click", changeFilter);
filtersCompleted.addEventListener("click", changeFilter);
