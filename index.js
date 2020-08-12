const toDoForm = document.querySelector(".toDoForm");
const toDoInput = document.querySelector(".new-todo");
const toDoList = document.querySelector(".todo-list");
let count = document.querySelector("strong");

let toDos = [];
let toDoId = 0;

// toDoList.addEventListener("dblclick",function(event){
//     //li tag에 editing class추가
//     //ESC키를 누르면 다시 view로 복귀
//     const
// })

function doneToDo(event) {
  const btn = event.target;
  const selectli = btn.parentNode;
  const list = selectli.parentNode;
  list.classList.add("completed");
  btn.setAttribute("checked", true);
  count.innerText = toDos.length;
}

function deleteToDo(event) {
  const btn = event.target;
  const selectli = btn.parentNode;
  const list = selectli.parentNode;
  const ul = document.getElementById("todo-list");
  ul.removeChild(list);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(list.id);
  });
  toDos = cleanToDos;
  count.innerText = toDos.length;
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
  count.innerText = toDos.length;

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
