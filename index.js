const toDoForm = document.querySelector(".toDoForm");
const toDoInput = document.querySelector(".new-todo");
const toDoList = document.querySelector(".todo-list");

let toDos = [];
let toDoId = 0;

function doneToDo(event) {
  const btn = event.target;
  const selectli = btn.parentNode;
  const list = selectli.parentNode;
  list.classList.add("completed");
  btn.setAttribute("checked", true);
}
function deleteToDo(event) {
  const btn = event.target;
  const selectli = btn.parentNode;
  const list = selectli.parentNode;
  list.removeChild(selectli);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(list.id);
  });
  toDos = cleanToDos;
}

function AddToDo(inputVal) {
  const title = inputVal;
  const newId = toDos.length + 1;
  const li = document.createElement("li");
  li.classList.add("addToDoList");
  li.innerHTML = `
        <div class="view">
         <input class="toggle" type="checkbox">
            <label class="label">${title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀">
    `;
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: `${title}`,
    id: newId,
  };
  toDoInput.value = "";
  toDos.push(toDoObj);

  const toggleBtn = document.querySelector(".toggle");
  toggleBtn.addEventListener("click", doneToDo);
  const destroyBtn = document.querySelector(".destroy");
  destroyBtn.addEventListener("click", deleteToDo);
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
