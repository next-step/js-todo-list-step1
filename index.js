const toDoForm = document.querySelector(".toDoForm");
const toDoInput = document.querySelector(".new-todo");
const toDoList = document.querySelector(".todo-list");

let toDos = [];
let toDoId = 0;
function AddToDo(inputVal) {
  const title = inputVal;
  toDoList.innerHTML = `
    <li>
        <div class="view">
         <input class="toggle" type="checkbox">
            <label class="label">${title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀">
    </li>
    `;
}

function handleSubmit(event) {
  event.preventDefault();
  const toDoTitle = toDoInput.value;
  AddToDo(toDoTitle);
  toDoInput.value = "";
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
