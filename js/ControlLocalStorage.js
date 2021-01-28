import {listTemplate} from './AddNewTodoItem.js'

export function initControlLocalStorage(){
    window.addEventListener("beforeunload", saveLocalStorage);
    window.addEventListener("DOMContentLoaded", loadLocalStorage);
}

//페이지 종료시 현재 리스트 저장 
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

//페이지 실행 시 현재 리스트 불러오는 기능 
function loadLocalStorage(){
    const load = JSON.parse(localStorage.getItem("json"));
    for(let i in load){
        getLoadStorageList(load[i]);
    }

    document.querySelector("strong").innerText = load.length;
}

//페이지 실행 시 현재 리스트를 불러오는 기능
function getLoadStorageList(loadData){
    const $todoList = document.getElementById("todo-list");

    const liClass = loadData["liClass"];
    const Checked = loadData["checked"];
    const Label = loadData["label"];


    const inputList = listTemplate(Label);
    $todoList.insertAdjacentHTML("beforeend", inputList);

    //마지막 자식에 접근
    const checkbox = $todoList.lastChild.querySelector(".toggle");
    if(Checked === "checked") checkbox.setAttribute("checked", "");
    if(liClass === "completed") $todoList.lastChild.classList.add("completed");
}
