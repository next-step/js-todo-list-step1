import {count} from "./components/ToDoCount.js";
import {loadToDos, saveToDo, PushTodo}from "./store/store.js";
import {cancel, deleteTodoItem, editing, completed} from "./components/ToDoList.js";
import {activeOf} from "./components/ToDoFilter.js";
import {
    paintToDo, edited
} from "./components/ToDoInput.js";


export let toDos = [];
export const TODOS_LS = "toDos";
const $toDoForm = document.querySelector(".toDojs");
const $toDoInput = $toDoForm.querySelector(".new-todo");
export const $toDoList = document.querySelector(".todo-list");
const $toDoFilter = document.querySelector(".filters");

function handlekeyup({ target }){
    const closestInput = target.closest("input");
    const closestLi = target.closest("li");

    if ( event.key === "Enter"){
        return edited(closestInput.value, closestLi);
    }
    if(event.key === "Escape"){
        return cancel(closestLi);
    }
} 

const handledbclick = ({ target }) => editing(target.closest("li"));

function handleClick({ target }) {
    const closestLi = target.closest("li");
    ({
        destroy: () => deleteTodoItem(closestLi),
        toggle: () => completed(closestLi),
        active: () => activeOf('active'),
        completed: () => activeOf('completed'),
        all: () => activeOf('all'),
    })[target.className]?.();
}


function handleSumit(event) {
    $toDoList.insertAdjacentHTML("beforeend", paintToDo($toDoInput.value,""));
    PushTodo($toDoInput.value,"unchecked");
    saveToDo();
    toDocountNum = $toDoList.childElementCount;
    count(toDocountNum);
    $toDoInput.value="";
}


function init(){  
    loadToDos();
    count($toDoList.childElementCount);
    $toDoForm.addEventListener("submit", handleSumit);
    $toDoList.addEventListener("click", handleClick);
    $toDoList.addEventListener("dblclick",handledbclick);
    $toDoList.addEventListener("keyup",handlekeyup);
    $toDoFilter.addEventListener("click",handleClick);
}
init();


