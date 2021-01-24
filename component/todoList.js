import { todoListEl, saveToDos, toDos } from "../todoApp.js";
import { filterState, handleCount, renderActiveItems, renderCompleteItems } from "./todoCount.js";

export const handleTodoItemClick=(event)=>{
    const targetClass = event.target.className.split(" ");

    if(targetClass[0] === "toggle") handleComplete(event);
    else if(targetClass[0] === "destroy") handleDestory(event);

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

const removeFromItems=(li)=>{
    try{
        const testItemId = li.dataset.id;
        toDos = toDos.filter(item =>`${item.id}` !== testItemId );
 
        saveToDos();
    }catch(error){
        console.log(error);
    }
    
}


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
    saveToDos();

}


function todoList(){
    
}

todoList();