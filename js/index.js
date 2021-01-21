var getWork = document.getElementById("new-todo-title"); // 할 일을 적는 input 태그
var todoList = document.getElementById("todo-list"); // 작성한 할 일이 삽입되는 ul 태그
var viewAllList = document.querySelector(".all"); // 전체 보기 버튼
var viewTodoList = document.querySelector(".active"); // 해야할 일 보기 버튼
var viewCompleteList = document.querySelector(".completed"); // 완료한 일 보기 버튼
 
function init() {   // 페이지 로드 시 이벤트 리스너 부착
  getWork.addEventListener("keypress", AddNewList);

  viewAllList.addEventListener("click", viewAll);
  viewTodoList.addEventListener("click", viewTodo);
  viewCompleteList.addEventListener("click", viewDone);

  window.addEventListener("beforeunload", saveLocalStorage);
  window.addEventListener("DOMContentLoaded", loadLocalStorage);
}

function AddNewList(e) {  // 새로운 항목을 추가하는 기능 
  if (e.key === "Enter") {
    if (e.target.value !== "" && !/^\s+|\s+$/g.exec(e.target.value)) {
      let text = e.target.value;
      e.target.value = null;

      let li = listAssemble(text);

      if (!/(completed)/.exec(window.location.href)) {
        li.classList.add("selected");
      } else {
        li.style.display = "none";
      }
    }
    else{

        alert("불필요한 공백을 제거해주세요!"); 
    }
  }
  renewStrong();
}

function workCheck(e) {  // 등록된 항목들을 체크하거나 푸는 기능 
  let li = e.target.parentNode.parentNode;
  if (e.target.checked) {
    e.target.setAttribute("checked", "");
    li.classList.add("completed");
  } else {
    e.target.removeAttribute("checked");
    li.classList.remove("completed");
  }
  if (/(active)/.exec(window.location.href)) viewTodo();
  else if (/(completed)/.exec(window.location.href)) viewDone();
}

function workDelete(e) {  // 등록된 항목들을 제거하는 기능
  if(confirm("정말 삭제하시겠습니까?")){
    let li = e.target.parentNode.parentNode;
  console.log(li);
  console.log(li.parentNode);
  li.parentNode.removeChild(li);
  renewStrong();
  }
}

function workContentCopy(e) {   // 등록된 항목의 수정을 위해 내용을 입력칸에 복사하는 기능
  let li = e.target.parentNode.parentNode;
  li.classList.add("editing");
  let chginput = e.target.parentNode.nextSibling;
  chginput.value = e.target.innerText;
}

function workUpdate(e) {      // 등록된 항목을 수정하는 기능
  let li = e.target.parentNode;
  if (e.keyCode == 27) {
    li.classList.remove("editing");
  }
  if (e.keyCode == 13) {
    if (e.target.value !== "" && !/^\s+|\s+$/g.exec(e.target.value)) {
      let label = e.target.previousSibling.childNodes[1];
      label.innerText = e.target.value;
      e.target.value = "";
      li.classList.remove("editing");
    } else {
      alert("불필요한 공백을 제거해주세요!");
    }
  }
}

function renewStrong() {      // 리스트 하단의 총 목록 갯수를 갱신하는 기능
  let list = document.querySelectorAll("#todo-list>li.selected");
  let items = document.querySelector("strong");
  items.innerText = list.length;
}

function viewAll() {    // "전체보기" 버튼 클릭 시의 기능
  let list = document.querySelectorAll("#todo-list>li");
  for (let i = 0; i < list.length; i++) {
    list[i].classList.add("selected");
  }
  changeBox(viewAllList);
  reflectView();
}

function viewTodo() {     // "해야할 일" 버튼 클릭 시의 기능
  let list = document.querySelectorAll("#todo-list>li");

  for (let i = 0; i < list.length; i++) {
    if (list[i].firstChild.firstChild.hasAttribute("checked")) {
      list[i].classList.remove("selected");
    } else {
      list[i].classList.add("selected");
    }
  }
  changeBox(viewTodoList);
  reflectView();
}

function viewDone() {       // "완료한 일" 버튼 클릭 시의 기능
  let list = document.querySelectorAll("#todo-list>li");
  for (let i = 0; i < list.length; i++) {
    if (!list[i].firstChild.firstChild.hasAttribute("checked")) {
      list[i].classList.remove("selected");
    } else {
      list[i].classList.add("selected");
    }
  }
  changeBox(viewCompleteList);
  reflectView();
}

function changeBox(box) {   // 선택한 버튼을 표시하는 기능
  console.log(box);
  if (box.classList.contains("all")) {
    viewAllList.classList.add("selected");
    viewTodoList.classList.remove("selected");
    viewCompleteList.classList.remove("selected");
  } else if (box.classList.contains("active")) {
    viewAllList.classList.remove("selected");
    viewTodoList.classList.add("selected");
    viewCompleteList.classList.remove("selected");
  } else if (box.classList.contains("completed")) {
    viewAllList.classList.remove("selected");
    viewTodoList.classList.remove("selected");
    viewCompleteList.classList.add("selected");
  }
}

function reflectView() {    // 현재 누른 버튼에 대한 뷰를 반영하는 기능
  let list = document.querySelectorAll("#todo-list>li");
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("selected")) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
  }
  renewStrong();
}

function saveLocalStorage() {   // 페이지 종료 시 현재 리스트를 저장하는 기능
  let list = document.querySelectorAll("#todo-list>li");
  let listArray = [];

  for (let i = 0; i < list.length; i++) {
    let dataset = { liClass: "", Checked: "", label: "" };
    if (list[i].classList.contains("completed")) {
      dataset.liClass = "completed";
      dataset.Checked = "checked";
    }
    dataset.label = list[i].firstChild.childNodes[1].innerText;
    listArray.push(dataset);
  }

  let jsonArray = JSON.stringify(listArray);

  localStorage.setItem("json", jsonArray);
}

function loadLocalStorage() {   // 페이지 실행 시 현재 리스트를 불러오는 기능
  var load = JSON.parse(localStorage.getItem("json"));
  for (let i in load) {
    getLocalStorageList(load[i]);
  }
  if (/(active)/.exec(window.location.href)) viewTodo();
  else if (/(completed)/.exec(window.location.href)) viewDone();
  else viewAll();
  
}

function getLocalStorageList(e) {   // 페이지 실행 시 현재 리스트를 불러오는 기능
  let liClass = e["liClass"];
  let Checked = e["Checked"];
  let Label = e["label"];

  let li = listAssemble(Label);
  let checkbox = li.firstChild.firstChild;

  if (Checked === "checked") checkbox.setAttribute("checked", "");
  if (liClass === "completed") li.classList.add("completed");
}

function listAssemble(content) {  // 인자로 받은 텍스트에 대한 항목을 생성하는 기능
  let li = document.createElement("li");
  let div = document.createElement("div");
  div.classList.add("view");

  let checkbox = document.createElement("input");
  checkbox.classList.add("toggle");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", workCheck);

  let label = document.createElement("label");
  label.classList.add("label");
  label.innerText = content;
  label.addEventListener("dblclick", workContentCopy);

  let inputforChange = document.createElement("input");
  inputforChange.classList.add("edit");
  inputforChange.setAttribute("value", "완료된 타이틀");
  inputforChange.addEventListener("keydown", workUpdate);

  let button = document.createElement("button");
  button.classList.add("destroy");
  button.addEventListener("click", workDelete);

  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(button);
  li.appendChild(div);
  li.appendChild(inputforChange);
  todoList.appendChild(li);

  return li;
}


init();