const $inputToDo = document.querySelector("#new-todo-title");
const $toDoList = document.querySelector(".todo-list");
const $toDoCount = document.querySelector(".todo-count");
const $filters = document.querySelector(".filters");
const $filtersAll = document.querySelector(".all");
const $filtersToDo = document.querySelector(".active");
const $filtersCompleted = document.querySelector(".completed");

let uniqueNumber = 0;
let toDosAll = [];
let toDosActive = [];
let toDosCompleted = [];

function handleEnter(event, inputValue) {
    if(event.key === 'Enter') {
        addToDo(inputValue);
        $inputToDo.value = ""; 
    }
}

function addToDo(text) {
    const idValue = ++uniqueNumber;

    const $li = document.createElement("li");
    $li.id = idValue;
    $li.addEventListener("dblclick", editToDo);
    
    const $div = document.createElement("div");
    $div.classList.add("view");
    
    const $inputToggle = document.createElement("input");
    $inputToggle.classList.add("toggle");
    $inputToggle.type = "checkbox";
    $inputToggle.id = idValue;
    $inputToggle.addEventListener("click", checkToDo);

    const $label = document.createElement("label");
    $label.classList.add("label");
    $label.innerHTML = text;

    const $delBtn = document.createElement("button");
    $delBtn.classList.add("destroy");
    $delBtn.id = idValue;
    $delBtn.addEventListener("click", deleteToDo);

    const $inputEdit = document.createElement("input");
    $inputEdit.classList.add("edit");
    $inputEdit.value = text;

    $li.appendChild($div);
    $div.appendChild($inputToggle);
    $div.appendChild($label);
    $div.appendChild($delBtn);
    $li.appendChild($inputEdit);

    $toDoList.appendChild($li);
    toDosAll.push($li);
    toDosActive.push($li);
    showNumbers();
}

function checkToDo(event) {
    const $inputToggle = event.target;
    const checkedState = $inputToggle.checked;
    if(checkedState) {
        $inputToggle.checked = true;
    } else {
        $inputToggle.checked = false;
    }

    const $li = $inputToggle.parentNode.parentNode;
    const completedState = $li.classList;
    if(!completedState.contains("completed")) { //할 일에서 완료로 변경
        toDosCompleted.push($li);
        toDosActive = toDosActive.filter(todo => todo.id != $li.id);
        $li.classList.remove("false");
        $li.classList.add("completed");
    } else { //완료에서 할 일로 변경
        toDosCompleted = toDosCompleted.filter(todo => todo.id != $li.id);
        toDosActive.push($li);
        $li.classList.remove("completed");
        $li.classList.add("false");
    }
}

function deleteToDo(event) {
    const $deleteBtn = event.target;
    const idValue = $deleteBtn.id;
    const $ul = document.querySelector("#todo-list");
    const $li = $ul.childNodes;
    const liSize = $ul.childNodes.length;
    
    for(let i = 0; i < liSize; i++) {
        if($li[i].id == idValue) {
            $ul.removeChild($li[i]);
            toDosCompleted = toDosCompleted.filter(todo => todo.id != idValue);
            toDosActive = toDosActive.filter(todo => todo.id != idValue);
            toDosAll = toDosAll.filter(todo => todo.id != idValue);
            break;
        }
    }
    showNumbers();
}

function editToDo(event) {
    const $label = event.target;
    const $li = $label.parentNode.parentNode;
    $li.classList.remove("false");
    $li.classList.add("editing");
    $li.addEventListener("keydown", finishEditToDo);
}


function finishEditToDo(event) { 
    if(event.key === 'Enter') {
        const $inputEdit = event.target;
        const editText = $inputEdit.value;

        const $label = $inputEdit.previousSibling.childNodes[1];
        $label.innerHTML = editText;
        const $li = $inputEdit.parentNode;
        $li.classList.remove("editing");
        $li.classList.add("false");
    }

    if(event.key === 'Escape') {
        const $inputEdit = event.target;
        const $li = $inputEdit.parentNode;
        $li.classList.remove("editing");
        $li.classList.add("false");
    }
}

function changeFilter(event) {
    const $target = event.target;
    const $liList = $filters.getElementsByTagName("li");
    for(let i=0 ; i<$liList.length; i++) {
        if($liList[i].firstElementChild.classList.contains("selected")) {
            $liList[i].firstElementChild.classList.remove("selected");
            break;
        }
    }
    $target.classList.add("selected");

    const targetClassList = $target.classList;
    const $liToDoList = $toDoList.getElementsByTagName("li");

    const liToDoListLength = $liToDoList.length;
    for(let i=0; i<liToDoListLength; i++) {
        $toDoList.removeChild($toDoList.firstChild);
    }

    if(targetClassList.contains("all")) {
        toDosAll.forEach(todo => $toDoList.appendChild(todo));
    }
    
    if(targetClassList.contains("active")) {
        toDosActive.forEach(todo => $toDoList.appendChild(todo));
    }
    
    if(targetClassList.contains("completed")) {
        toDosCompleted.forEach(todo => $toDoList.appendChild(todo));
    }
    showNumbers();
}

function showNumbers() {
    const strong = $toDoCount.firstChild.nextSibling;
    strong.innerHTML = $toDoList.childNodes.length;
}

function init() {
    $inputToDo.addEventListener("keydown", event => handleEnter(event, $inputToDo.value));
    $filtersAll.addEventListener("click", changeFilter);
    $filtersToDo.addEventListener("click", changeFilter);
    $filtersCompleted.addEventListener("click", changeFilter);
}

init(); 
