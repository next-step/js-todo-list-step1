const inputTodo = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");

function addTodoItem(e) {
  if (e.keyCode == "13" && e.target.value != "") {
    let inputText = inputTodo.value;
    let todoItem = document.createElement("li");
    //html 조각을 가지게 한다.
    todoItem.innerHTML = `<div class="view">
    <input class="toggle" type="checkbox"/>
    <label class="label">${inputText}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value=${inputText} />`;
    inputTodo.value = "";
    todoList.append(todoItem);
  }
}

function destroy(e) {
  if (e.target && e.target.className == "destroy") {
    e.target.parentNode.parentNode.remove();
  }
}

function check(e) {
  if (e.target && e.target.className == "toggle") {
    e.target.parentNode.parentNode.classList.toggle("completed");
  }
}

inputTodo.addEventListener("keydown", addTodoItem);
document.addEventListener("click", destroy);
document.addEventListener("click", check);
