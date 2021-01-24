import { todoListEl,toDos,addToDos } from "../todoApp.js";

export const todoCountEl = document.querySelector(".todo-count");
export const countContainerEl = document.querySelector(".count-container");

export const allEl = document.querySelector(".all");
export const activeEl = document.querySelector(".active");
export const completedEl = document.querySelector(".completed");
export const filterEls = document.querySelectorAll(".filters a");
export let filterState = "all";


export const handleCount=(length)=>{
    todoCountEl.innerHTML = `총 <strong>${length}</strong> 개`
}

export const renderActiveItems = () => {
    todoListEl.innerHTML = "";
    const activeItems = toDos.filter(item => item.completed === false );
    activeItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(activeItems.length);
}

export const renderCompleteItems = () =>{
    
    todoListEl.innerHTML = "";
    let completedItems = toDos.filter(item => item.completed === true );
    completedItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(completedItems.length);
}

export const viewAllClick = (event)=>{
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

export const viewActiveClick = (event)=>{
    event.preventDefault();
    filterState = "active";

    filterEls.forEach((el) => {
        el.classList.remove("selected");
    });
    activeEl.classList.add("selected");

    renderActiveItems();
}

export const viewCompletedClick = (event)=>{
    event.preventDefault();
    filterState = "completed";
    filterEls.forEach((el) => {
        el.classList.remove("selected");
    });
    completedEl.classList.add("selected");
    
    renderCompleteItems();
}

function init(){
    activeEl && activeEl.addEventListener("click",viewActiveClick);
    allEl && allEl.addEventListener("click",viewAllClick);
    completedEl && completedEl.addEventListener("click",viewCompletedClick);
}

init();