const $inputToDo = document.querySelector("#new-todo-title");
const $toDoList = document.querySelector(".todo-list");
const $toDoCount = document.querySelector(".todo-count");
const $filters = document.querySelector(".filters");
const $filtersAll = document.querySelector(".all");
const $filtersToDo = document.querySelector(".active");
const $filtersCompleted = document.querySelector(".completed");

let uniqueNumber = 0;
const TODO_LS = "todos";

function handleEnter(event, inputValue) {
    if(event.key === 'Enter') {
        addToDo(inputValue);
        $inputToDo.value = ""; 
    }
}

function addToDo(text) {
    const idValue = ++uniqueNumber;

    const li = document.createElement("li");
    li.id = idValue;
    li.addEventListener("dblclick", editToDo);
    
    const div = document.createElement("div");
    div.classList.add("view");
    
    const inputToggle = document.createElement("input");
    inputToggle.classList.add("toggle");
    inputToggle.type = "checkbox";
    inputToggle.id = idValue;
    inputToggle.addEventListener("click", checkToDo);

    const label = document.createElement("label");
    label.classList.add("label");
    label.innerHTML = text;

    const delBtn = document.createElement("button");
    delBtn.classList.add("destroy");
    delBtn.id = idValue;
    delBtn.addEventListener("click", deleteToDo);

    const inputEdit = document.createElement("input");
    inputEdit.classList.add("edit");
    inputEdit.value = text;

    li.appendChild(div);
    div.appendChild(inputToggle);
    div.appendChild(label);
    div.appendChild(delBtn);
    li.appendChild(inputEdit);

    $toDoList.appendChild(li);
    showNumbers();
}

function checkToDo(event) {
    const inputToggle = event.target;
    const checkedState = inputToggle.checked;
    if(checkedState) {
        inputToggle.checked = true;
    } else {
        inputToggle.checked = false;
    }

    const li = inputToggle.parentNode.parentNode;
    const completedState = li.classList;
    if(completedState.contains("completed")) {
        li.classList.remove("completed");
        li.classList.add("false");
    } else {
        li.classList.remove("false");
        li.classList.add("completed");
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
    showNumbers();
}

function editToDo(event) {
    const label = event.target;
    const li = label.parentNode.parentNode;
    li.classList.remove("false");
    li.classList.add("editing");
    li.addEventListener("keydown", finishEditToDo);
}

function finishEditToDo(event) { 
    if(event.key === 'Enter') {
        const inputEdit = event.target;
        const editText = inputEdit.value;

        const label = inputEdit.previousSibling.childNodes[1];
        label.innerHTML = editText;
        const li = inputEdit.parentNode;
        li.classList.remove("editing");
        li.classList.add("false");
    }

    if(event.key === 'Escape') {
        const inputEdit = event.target;
        const li = inputEdit.parentNode;
        li.classList.remove("editing");
        li.classList.add("false");
    }
}

function changeFilter(event) {
    const target = event.target;
    const liList = $filters.getElementsByTagName("li");
    for(let i=0 ; i<liList.length; i++) {
        if(liList[i].firstElementChild.classList.contains("selected")) {
            liList[i].firstElementChild.classList.remove("selected");
            break;
        }
    }
    target.classList.add("selected");

    const targetClassList = target.classList;
    const liToDoList = $toDoList.getElementsByTagName("li");
    if(targetClassList.contains("all")) {
        for(let i=0; i<liToDoList.length; i++) {
            liToDoList[i].style.display = "block";   
        }
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
    }
    showNumbers();
}

function showNumbers() {
    let numbers = 0;
    const liList = $toDoList.childNodes;
    for(let i=0; i<liList.length; i++) {
        if(liList[i].style.display === 'block' || liList[i].style.display === '') {
            numbers++;
        }
    }
    const strong = $toDoCount.firstChild.nextSibling;
    strong.innerHTML = numbers;
}

$inputToDo.addEventListener("keydown", event => handleEnter(event, $inputToDo.value));
$filtersAll.addEventListener("click", changeFilter);
$filtersToDo.addEventListener("click", changeFilter);
$filtersCompleted.addEventListener("click", changeFilter);
