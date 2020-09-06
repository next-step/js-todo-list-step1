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
            countList();
        }
    }
});

document.getElementById("todo-list").addEventListener("dblclick", function(e){
    if (e.target && e.target.nodeName == "LABEL" && e.target.classList == "label"){
        e.target.closest("li").classList.add("editing");
        e.target.closest("li").lastElementChild.focus();
    }
});

document.getElementById("todo-list").addEventListener("keyup", function(e){
    if (e.target && e.target.nodeName == "INPUT" && e.target.classList == "edit" && e.key == "Escape"){
        e.target.closest("li input").value = e.target.closest("li").querySelector("label").innerText;
        e.target.closest("li").classList.remove("editing");
    }
});

document.getElementById("todo-list").addEventListener("focusout", function(e){
    if (e.target && e.target.nodeName == "INPUT" && e.target.classList == "edit"){
        e.target.closest("li").querySelector("label").innerText = e.target.closest("li input").value;
        e.target.closest("li").classList.remove("editing");
    }
});

document.querySelector(".filters").addEventListener("click", function(e){
    if (e.target && e.target.nodeName == "A"){
        document.querySelector(".filters .selected").classList.remove("selected");
        e.target.classList.add("selected");
        if (e.target.classList.contains("all")){
            document.querySelectorAll(".todo-list li").forEach( e => {
                e.style.display = "";
            });
        }
        else if (e.target.classList.contains("active")){
            document.querySelectorAll(".todo-list li").forEach( function(e){
                if(e.closest("li").classList == "completed") e.style.display = "none";
                else e.style.display = "";
            });
        }
        else if (e.target.classList.contains("completed")){
            document.querySelectorAll(".todo-list li").forEach(function(e){
                if(e.closest("li").classList != "completed") e.style.display = "none";
                else e.style.display = "";
            });
        }
    }
});

function countList(){
    document.querySelector(".todo-count strong").innerText = 
      document.querySelector("#todo-list").childElementCount
}

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
        countList();
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
                  <input class="edit" value="${title}">
              </li>`;
}