const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector(".toggle");

$todoInput.addEventListener("keyup", onAddTodoItem);

document.getElementById("todo-list").addEventListener("click", function (e) {            
    if (e.target && e.target.nodeName == "INPUT" && e.target.classList == "toggle") {    
        e.target.closest("li").classList.toggle("completed");
    }
    else if(e.target && e.target.nodeName == "BUTTON" && e.target.classList == "destroy"){
        if(confirm("정말로 삭제하시겠습니까?")){ 
            e.target.closest("li").remove();
        }
    }
});

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
  }
}

function onToggleTodoItem(event) {
  event.target.closest("li").classList.toggle("completed");
}

function renderTodoItemTemplate(title) {
  return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="새로운 타이틀">
              </li>`;
}