import  { handleCount, viewCompletedClick,completedEl, filterState, renderActiveItems, renderCompleteItems } from "./component/todoCount.js";
import {handleTodoItemClick} from "./component/todoList.js"
import "./component/todoList.js";
export const todoListEl = document.getElementById('todo-list');

const toDoInput = document.getElementById("new-todo-title");
const labelEl = document.querySelector(".label");

const TODOS_LS ="toDos";
export let toDos = [];


export const addToDos = (item)=>{
    todoListEl.insertAdjacentHTML("beforeend",renderTodoItemTemplate(item));
    toDoInput.value="";
}

const addToItems = (item)=>{
    toDos = [item, ...toDos];   
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


const updateEditTitle=(event)=>{
    for(let obj of toDos){
        if( obj.id === parseInt(event.path[1].dataset.id)){
            obj.title = event.path[0].value;
        }
    }
    saveToDos();
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
    const targetInput =event.target.parentNode.nextSibling.nextSibling;
    
    try{
        await targetInput.addEventListener("keyup",updateEdit);
        
    }catch(error){
        console.log(error);
    }
    
}


const handleEdit=(event)=>{
    const targetLi = event.target.closest('li');
    targetLi.classList.add("editing");
    handleEdinting(event);

}





export const renderTodoItemTemplate=(item)=>{
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


export const saveToDos=()=>{
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

export const loadToDos=()=>{

    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach((toDo)=>{

            addToDos(toDo);
            addToItems(toDo)
        });
    }
    handleCount(toDos.length);
}

function todoApp(){
    todoListEl && todoListEl.addEventListener("click",handleTodoItemClick);
    labelEl && labelEl.addEventListener("click",handleEdit);
    todoListEl && todoListEl.addEventListener("dblclick",handleEdit);
    toDoInput && toDoInput.addEventListener( "change",handleNewTodoSubmit); 
}
todoApp();