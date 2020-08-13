const toDoForm = document.querySelector(".toDoForm");
const toDoInput = document.querySelector(".new-todo");
const toDoList = document.querySelector(".todo-list");
let count = document.querySelector("strong");

let toDos = [];

function doneToDo(event) {
  const btn = event.target;
  const selectli = btn.parentNode;
  const list = selectli.parentNode;
  list.classList.add("completed");
  btn.setAttribute("checked", true);
  count.innerText = toDos.length;

  //localStorage에 해야할 일을 완료한 일로 변경하는 과정
  saveDoneToDos();
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(list.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const selectli = btn.parentNode;
  const list = selectli.parentNode;
  const ul = document.getElementById("todo-list");
  ul.removeChild(list);

  //해야할 일, 완료한 일을 localstorage에서 삭제하는 과정
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(list.id);
  });

  toDos = cleanToDos;
  count.innerText = toDos.length;
  saveToDos();
  saveDoneToDos();
}

//localStorage에 해야할 일 저장하는 함수
function saveToDos() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}
//localStorage에 완료한 일 저장하는 함수
function saveDoneToDos() {
  localStorage.setItem("DoneToDos", JSON.stringify(toDos));
}

//해야할 일 목록 추가하는 함수
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
  saveToDos();
  const destroyBtn = document.querySelector(".destroy");
  destroyBtn.addEventListener("click", deleteToDo);

  const toggleBtn = document.querySelector(".toggle");
  toggleBtn.addEventListener("click", doneToDo);

  // const label = document.querySelector("label");
  // li.addEventListener("dblclick", function (event) {
  //   //li tag에 editing class추가
  //   //ESC키를 누르면 다시 view로 복귀
  //   const i = documnet.createElement("input");
  //   const e = event.target;
  //   e.parentNode.replaceChild(i, e);
  // });
}

function handleSubmit(event) {
  event.preventDefault();
  const toDoTitle = toDoInput.value;
  AddToDo(toDoTitle);
  toDoInput.value = "";
}

//localstorage에 저장된 값 불러오는 함수
function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function something(toDo) {
      AddToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
