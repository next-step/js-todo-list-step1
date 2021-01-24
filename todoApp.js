import  { handleCount } from "./component/todoCount.js";
let toDos = [

];
let filterState = "all";
const toDoInput = document.getElementById("new-todo-title");
const todoListEl = document.getElementById('todo-list');
const filterEls = document.querySelectorAll(".filters a");
const allEl = document.querySelector(".all");
const activeEl = document.querySelector(".active");
const completedEl = document.querySelector(".completed");
const labelEl = document.querySelector(".label");
const eidtInputEl = document.querySelectorAll(".edit")


const TODOS_LS ="toDos";

const addToDos = (item)=>{
    todoListEl.insertAdjacentHTML("beforeend",renderTodoItemTemplate(item));
    toDoInput.value="";
}

const addToItems = (item)=>{
    toDos = [item, ...toDos];   
    saveToDos();
}


const removeFromItems=(li)=>{
    const testItemId = li.dataset.id;
    toDos = toDos.filter(item => `${item.id}` !== testItemId);
    saveToDos();
}


const handleNewTodoSubmit = async (event)=>{
    const newItem = {
        id: Date.now(),
        title: event.target.value,
        completed: false
    }

    await addToItems(newItem);
    addToDos(newItem);
    handleCount(toDos.length);
    if(filterState === "completed"){
        renderCompleteItems();
    } else if (filterState === "active"){
        renderActiveItems();
    }

};


const itemsUpdate=(event)=>{

    const currentLi = event.target.closest('li');

    const currentItemId = currentLi.dataset.id;
    for(let obj of toDos){

        if(obj.completed === false && obj.id === parseInt(currentItemId)){
            obj.completed = true;
            
        } else if(obj.completed === true && obj.id === parseInt(currentItemId)){
            obj.completed = false;
        }
    }
    if(filterState === "completed"){
        renderCompleteItems();
    } else if (filterState === "active"){
        renderActiveItems();
    }

}
    
const handleComplete=(event)=>{
    event.target.closest("li").classList.toggle("completed");
    event.target.closest("input").classList.toggle("checked");
    itemsUpdate(event);
}


const handleDestory=(event)=>{
    const li = event.target.parentNode.parentNode;
    removeFromItems(li);
    todoListEl.removeChild(li);

    handleCount(toDos.length);
}

const updateEditTitle=(event)=>{
    for(let obj of toDos){

        if( obj.id === parseInt(event.path[1].dataset.id)){
            obj.title = event.path[0].value;
        }
    }
}

const updateEdit=(event)=>{

    if(event.keyCode === 13){

        event.path[1].childNodes[1].childNodes[3].innerText=event.path[0].value;
        event.path[1].classList.remove('editing');

        updateEditTitle(event);
        
    } else if(event.keyCode === 27){

        event.path[1].classList.remove('editing');
    }
    
}
const handleEdinting=async(event)=>{
    const targetInput =event.target.parentNode.nextSibling.nextSibling
    
    try{
        await targetInput.addEventListener("keyup",updateEdit);
        saveToDos();
    }catch(error){
        console.log(error);
    }
    
}


const handleEdit=(event)=>{
    const targetLi = event.target.closest('li');
    targetLi.classList.add("editing");
    handleEdinting(event);
}

const handleTodoItemClick=(event)=>{
    const targetClass = event.target.className.split(" ");
    
    if(targetClass[0] === "toggle") handleComplete(event);
    else if(targetClass[0] === "destroy") handleDestory(event);

}



const renderTodoItemTemplate=(item)=>{
    return (
     `<li data-id="${item.id}" class="${item.completed ? "completed" : ""}">
        <div class="view">
            <input class="toggle" type="checkbox" ${item.completed ? "checked" : ""}/>
            <label class="label">${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
    </li>`);
};

const viewAllClick = (event)=>{
    event.preventDefault();
    filterState = "all";
    filterEls.forEach((el) => {
        el.classList.remove("selected");
    });
    allEl.classList.add("selected");

    todoListEl.innerHTML = "";
    toDos.forEach((item) => {
        addToDos(item)
    });
    handleCount(toDos.length);
}

const renderActiveItems = () => {
    todoListEl.innerHTML = "";
    const activeItems = toDos.filter(item => item.completed === false );
    activeItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(activeItems.length);
}

const viewActiveClick = (event)=>{
    event.preventDefault();
    filterState = "active";

    filterEls.forEach((el) => {
        el.classList.remove("selected");
    });
    activeEl.classList.add("selected");

    renderActiveItems();
}

const renderCompleteItems = () =>{
    
    todoListEl.innerHTML = "";
    let completedItems = toDos.filter(item => item.completed === true );
    completedItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(completedItems.length);
}
const viewCompletedClick = (event)=>{
    event.preventDefault();
    filterState = "completed";
    filterEls.forEach((el) => {
        el.classList.remove("selected");
    });
    completedEl.classList.add("selected");
    
    renderCompleteItems();
}

const saveToDos=()=>{
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}
const loadToDos=()=>{

    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach((toDo)=>{

            addToDos(toDo);
            addToItems(toDo)
        });
    }
}

function init() {
    console.log("load toDos");
    loadToDos();

    todoListEl && todoListEl.addEventListener("click",handleTodoItemClick);
    todoListEl && todoListEl.addEventListener("dblclick",handleEdit);
    toDoInput && toDoInput.addEventListener( "change",handleNewTodoSubmit); 
    allEl && allEl.addEventListener("click",viewAllClick);
    activeEl && activeEl.addEventListener("click",viewActiveClick);
    completedEl && completedEl.addEventListener("click",viewCompletedClick);
    labelEl && labelEl.addEventListener("click",handleEdit);

    handleCount(toDos.length);
}

init();
