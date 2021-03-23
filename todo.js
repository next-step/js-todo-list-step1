const todo=document.getElementById("new-todo-title"),
toDoList=document.getElementById("todo-list"),
checkboxes=document.querySelectorAll("toggle"),
toDoCount=document.getElementsByClassName("todo-count")[0];

function handleDelete(event){
    const btn=event.target
    const li=btn.parentNode.parentNode;
    toDoList.removeChild(li);
    countToDos()
}

function handleCheckBox(event){
    const checkBox=event.target
    const li=checkBox.parentNode.parentNode;

    if(event.currentTarget.checked){
        li.className="completed"
        checkBox.setAttribute("checked","");
    }
}

function handleToDo(event){
    const li=event.target.parentNode,
    div=li.getElementsByClassName("view")[0],
    label=div.getElementsByClassName("label")[0];

    if(event.key=="Enter"){
        label.innerHTML=event.target.value;
        li.classList.remove("editing")
    }else if(event.key=="Escape"){
        li.classList.remove("editing")
    }
}
function handleEditMode(event){
    const li=event.target.parentNode.parentNode;
    const newInput=li.getElementsByClassName("edit")[0];
    
    li.classList.add("editing")
    console.log(newInput);
    newInput.addEventListener("keyup",handleToDo)
}

function handleToDoList(event){
    if(event.key==="Enter"){
        const li = document.createElement("li"),
        div=document.createElement("div"),
        input=document.createElement("input"),
        label=document.createElement("label"),
        button=document.createElement("button"),
        einput=document.createElement("input");

        div.className="view"
        
        input.className="toggle";input.type="checkbox";
        input.addEventListener("change",handleCheckBox)

        label.className="label";label.innerHTML=todo.value;
        label.addEventListener("dblclick",handleEditMode)

        button.className="destroy"
        button.addEventListener("click",handleDelete)
        einput.className="edit";einput.value=todo.value;

        div.appendChild(input);div.appendChild(label);div.appendChild(button);
        li.appendChild(div);li.appendChild(einput);
        

        toDoList.appendChild(li)
        countToDos()
    }
}

function countToDos(){
    let count=toDoList.childElementCount;
    toDoCount.getElementsByTagName("strong")[0].innerText=count;
}
function init(){
    todo.addEventListener("keyup",handleToDoList);
}

init();