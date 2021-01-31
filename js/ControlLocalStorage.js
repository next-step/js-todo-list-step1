import {todoTemplate} from './AddNewTodoItem.js'

export function initControlLocalStorage(){
    window.addEventListener("beforeunload", saveLocalStorage);
    window.addEventListener("DOMContentLoaded", loadLocalStorage);
}

//페이지를 떠날 때 list의 정보를 저장한다. 
function saveLocalStorage(){
    const list = document.querySelectorAll("#todo-list li");
    let listArray = [];

    for (let i=0; i < list.length; i++){
        var listSet = {
            liClass: "", 
            checked: "", 
            label:""
        };
        
        if(list[i].classList.contains("completed")){
            listSet.liClass = "completed";
            listSet.checked = "checked";
        }

        listSet.label = list[i].querySelector(".label").innerText;
        listArray.push(listSet);
    }

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
function getLoadStorageList(loadData){
    const $todoList = document.getElementById("todo-list");

    const liClass = loadData["liClass"];
    const Checked = loadData["checked"];
    const Label = loadData["label"];


    const inputList = todoTemplate(Label);
    $todoList.insertAdjacentHTML("beforeend", inputList);

    //추가된 list setting
    const checkbox = $todoList.lastChild.querySelector(".toggle");
    if(Checked === "checked") checkbox.setAttribute("checked", "");
    if(liClass === "completed") $todoList.lastChild.classList.add("completed");
}
