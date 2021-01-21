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



function listAssemble(content) {  // 인자로 받은 텍스트에 대한 항목을 생성하는 기능
  let li = document.createElement("li");
  let div = document.createElement("div");
  div.classList.add("view");

  let checkbox = document.createElement("input");
  checkbox.classList.add("toggle");
  checkbox.setAttribute("type", "checkbox");

  let label = document.createElement("label");
  label.classList.add("label");
  label.innerText = content;

  let inputforChange = document.createElement("input");
  inputforChange.classList.add("edit");
  inputforChange.setAttribute("value", "완료된 타이틀");

  let button = document.createElement("button");
  button.classList.add("destroy");

  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(button);
  li.appendChild(div);
  li.appendChild(inputforChange);
  todoList.appendChild(li);

  return li;
}


init();