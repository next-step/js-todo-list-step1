import {todoTemplate} from './AddNewTodoItem.js'

export function initControlLocalStorage(){
    window.addEventListener("beforeunload", saveLocalStorage);
    window.addEventListener("DOMContentLoaded", loadLocalStorage);
}

//페이지를 떠날 때 list의 정보를 저장한다. 
function saveLocalStorage(){
    const list = document.querySelectorAll("#todo-list li");
    let listArray = [];

    list.forEach(li => {
        const listSet = {
            liClass: "", 
            label:""
        };

        if(li.classList.contains("completed")){
            listSet.liClass = "completed checked";
        }

        listSet.label = li.querySelector(".label").innerText;
        listArray.push(listSet);
    });

    const jsonArray = JSON.stringify(listArray);
    localStorage.setItem("json", jsonArray);
}

//저장된 list를 부른다.
function loadLocalStorage(){
    const load = JSON.parse(localStorage.getItem("json"));
    for(let i in load){
        getLoadStorageList(load[i]);
    }

    document.querySelector("strong").innerText = load.length;
}

//data를 load하여 list에 적용한다.
function getLoadStorageList({liClass: liclass, label: label}){
    const $todoList = document.getElementById("todo-list");
    const liClass = liclass;
    const liLabel = label;


    const inputList = todoTemplate(liLabel);
    $todoList.insertAdjacentHTML("beforeend", inputList);

    //추가된 list setting
    const checkbox = $todoList.lastChild.querySelector(".toggle");
    if(liClass.includes("checked")) checkbox.setAttribute("checked", "");
    if(liClass.includes("completed")) $todoList.lastChild.classList.add("completed");
}
