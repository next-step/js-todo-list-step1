import {paintToDo, edited} from "../components/ToDoInput.js";
import { $toDoList, toDos ,TODOS_LS } from "../app.js";



export function saveToDo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

export function removetoDosObj(text){
    const index = toDos.findIndex(item => item.text === text);
    toDos.splice(index, 1);
    saveToDo();
}

export const PushTodo = (text, check) => toDos.push({ text, check });

export function loadToDos() {
    const PushTodo = (text, check) => toDos.push({ text, check });
    const parsedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
    console.log(toDos);
    if (toDos === null | parsedToDos === null) return;

    parsedToDos.forEach(({ check, text }) => {
        const completed = check === "checked" ? 'completed' : '';
        $toDoList.insertAdjacentHTML("beforeend", paintToDo(text, completed))
        PushTodo(text, check);
    });

    $toDoList.querySelectorAll(".completed").forEach(item => {
        item.querySelector(".toggle").checked = true;
    })
}