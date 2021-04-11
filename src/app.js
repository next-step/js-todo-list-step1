// Selectors
const todoInput = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoInput.addEventListener("keyup", addTodo);
todoList.addEventListener("click", clickTodo);
todoList.addEventListener("dblclick", dblclickTodo);
todoList.addEventListener("keyup", editTodo);

// Functions
function makeElem(type, parentNode, className = "") {
  const ret = document.createElement(type);
  parentNode.appendChild(ret);
  if (className != "") ret.classList.add(className);
  return ret;
}

function addTodo(e) {
  if (e.key === "Enter" && todoInput.value) {
    // event.preventDefault();
    const newTodo = makeElem("li", todoList, "false");
    const todoDiv = makeElem("div", newTodo, "view");
    const todoCheck = makeElem("input", todoDiv, "toggle");
    const todoLabel = makeElem("label", todoDiv, "label");
    const todoDelete = makeElem("button", todoDiv, "destroy");
    const todoEdit = makeElem("input", newTodo, "edit");
    todoCheck.setAttribute("type", "checkbox");
    todoCheck.setAttribute("false", "");
    todoLabel.innerText = todoInput.value;
    todoEdit.setAttribute("value", todoInput.value);
    todoInput.value = "";
  }
}

function clickTodo(e) {
  const item = e.target;

  if (item.classList[0] === "toggle") {
    if (item.hasAttribute("false")) {
      item.removeAttribute("false");
      item.setAttribute("checked", "");
      item.parentNode.parentNode.classList.replace("false", "completed");
    } else {
      item.removeAttribute("checked");
      item.setAttribute("false", "");
      item.parentNode.parentNode.classList.replace("completed", "false");
    }
  }
  // else if (item.classList[0] === "destroy") {
  //   item.parentNode.parentNode.remove();
  // }
}

function dblclickTodo(e) {
  const item = e.target;

  if (item.classList[0] === "label") {
    item.parentNode.parentNode.classList.add("editing");
  }
}

function editTodo(e) {
  const item = e.target;
  
  // e.preventDefault();
  // console.log(e.key);
  // console.log(e.keyCode);

  // const test = document.querySelector('.edit');
  // console.log(test.value);

  if (e.key === "Escape") {
    item.parentNode.classList.remove("editing");
  }
  // else if (e.key === "Enter" && item.parentNode.hasAttribute('editing')) {
  else if (e.key === "Enter") { // 이렇게 해도 되나?
    const editInput = document.querySelector('.edit');
    const todoLabel = document.querySelector('.label');
    editInput.innerText = editInput.value;
    todoLabel.innerText = editInput.value;
    item.parentNode.classList.remove("editing");
  }
}
