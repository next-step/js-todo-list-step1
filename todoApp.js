import  { handleCount, filterState, renderActiveItems, renderCompleteItems } from "./component/todoCount.js";
import {handleTodoItemClick} from "./component/todoList.js"
import {handleEdit} from"./component/todoInput.js";
export const todoListEl = document.getElementById('todo-list');

const toDoInput = document.getElementById("new-todo-title");


const TODOS_LS ="toDos";
export let toDos = [];


export const filterToDos = (todos,testItemId) =>{
    toDos = todos.filter(item =>`${item.id}` !== testItemId );
    saveToDos();
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



export const addToDos = (item)=>{
    todoListEl.insertAdjacentHTML("beforeend",renderTodoItemTemplate(item));
    toDoInput.value="";
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
    toDoInput && toDoInput.addEventListener( "change",handleNewTodoSubmit);
    todoListEl && todoListEl.addEventListener("dblclick",handleEdit); 
}
todoApp();