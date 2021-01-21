var getWork = document.getElementById("new-todo-title"); // 할 일을 적는 input 태그
var todoList = document.getElementById("todo-list"); // 작성한 할 일이 삽입되는 ul 태그

function init() {   // 페이지 로드 시 이벤트 리스너 부착
  getWork.addEventListener("keypress", AddNewList);

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
}

function workDelete(e) {  // 등록된 항목들을 제거하는 기능
  let li = e.target.parentNode.parentNode;
  console.log(li);
  console.log(li.parentNode);
  li.parentNode.removeChild(li);

  renewStrong();
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

  renewStrong();

  return li;
}


init();