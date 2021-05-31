const ul = document.getElementById("todo-list");

function createLi(labelText) {
    let newLI = document.createElement("li");
    let newDIV = document.createElement("div");
    let newINPUT = document.createElement("input");
    let newLABEL = document.createElement("label");
    let newBUTTON = document.createElement("button");
    let newEditINPUT = document.createElement("input");

    newDIV.setAttribute("class", "view");
    newINPUT.setAttribute("class", "toggle");
    newINPUT.setAttribute("type", "checkbox");
    newINPUT.setAttribute("onclick","changeStatus()");
    newLABEL.setAttribute("class", "label");
    newLABEL.innerHTML = labelText;
    newBUTTON.setAttribute("class", "destroy");
    newBUTTON.setAttribute("onclick", "deleteTodo()");
    newEditINPUT.setAttribute("class", "edit");
    newEditINPUT.setAttribute("value", labelText);

    newDIV.appendChild(newINPUT);
    newDIV.appendChild(newLABEL);
    newDIV.appendChild(newBUTTON);
    newLI.appendChild(newDIV);
    newLI.appendChild(newEditINPUT);

    ul.appendChild(newLI);
}

//일정 추가하기
function addTodo() {
    if (window.event.keyCode == 13) {
        let title = document.getElementById("new-todo-title");
        createLi(title.value);
        document.getElementById("new-todo-title").value = "";
    }
}

//일정 상태변경
function changeStatus(e) {
  let event = e || window.event;
  let li = event.target.parentElement.parentElement;
  li.classList.toggle('completed')
}
//일정 삭제하기
function deleteTodo(e) {
    let event = e || window.event;
    ul.removeChild(event.target.parentElement.parentElement);
}
//일정수 계산하기
function calTodoCount() {
    document.getElementById("todo-count-text").innerText =  ul.childElementCount;

}
//일정 상태별 확인
function filterTodoByStatus() {
  
}

ul.addEventListener("change", calTodoCount());
