import {count} from "./components/ToDoCount.js";
import store from "./store/store.js";
import ToDoList from "./components/ToDoList.js";
import {activeOf} from "./components/ToDoFilter.js";
import ToDoInput from "./components/ToDoInput.js";
export {$toDoList};

const $toDoForm = document.querySelector(".toDojs");
const $toDoInput = $toDoForm.querySelector(".new-todo");
const $toDoList = document.querySelector(".todo-list");
const $toDoFilter = document.querySelector(".filters");

function handlekeyup({ target }){
    const closestInput = target.closest("input");
    const closestLi = target.closest("li");

    if ( event.key === "Enter"){
        return ToDoInput.edited(closestInput.value, closestLi);
    }
    if(event.key === "Escape"){
        return ToDoList.cancel(closestLi);
    }
} 

const handledbclick = ({ target }) => ToDoList.editing(target.closest("li"));

function handleClick({ target }) {
    const closestLi = target.closest("li");
    ({
        destroy: () => ToDoList.deleteTodoItem(closestLi),
        toggle: () => ToDoList.completed(closestLi),
        active: () => activeOf('active'),
        completed: () => activeOf('completed'),
        all: () => activeOf('all'),
    })[target.className]?.();
}


function handleSumit(event) {
    $toDoList.insertAdjacentHTML("beforeend", ToDoInput.paintToDo($toDoInput.value,""));
    store.PushTodo($toDoInput.value,"unchecked");
    store.saveToDo();
    toDocountNum = $toDoList.childElementCount;
    count(toDocountNum);
    $toDoInput.value="";
}


function init(){  
    store.loadToDos();
    count($toDoList.childElementCount);
    $toDoForm.addEventListener("submit", handleSumit);
    $toDoList.addEventListener("click", handleClick);
    $toDoList.addEventListener("dblclick",handledbclick);
    $toDoList.addEventListener("keyup",handlekeyup);
    $toDoFilter.addEventListener("click",handleClick);
}
init();


