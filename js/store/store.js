import ToDoInput from "../components/ToDoInput.js";
import {$toDoList}from "../app.js";
import {toDos, TODOS_LS} from "../store/storeConfig.js"
export default {
    saveToDo, removetoDosObj ,PushTodo, loadToDos
  }


function saveToDo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function removetoDosObj(text){
    const index = toDos.findIndex(item => item.text === text);
    toDos.splice(index, 1);
    saveToDo();
}

const PushTodo = (text, check) => toDos.push({ text, check });

function loadToDos() {
    const parsedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
    if (toDos === null) return;

    parsedToDos.forEach(({ check, text }) => {
        const completed = check === "checked" ? 'completed' : '';
        $toDoList.insertAdjacentHTML("beforeend", ToDoInput.paintToDo(text, completed))
        PushTodo(text, check);
    });

    $toDoList.querySelectorAll(".completed").forEach(item => {
        item.querySelector(".toggle").checked = true;
    })
}