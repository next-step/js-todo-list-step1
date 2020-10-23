//document query selectors
const input = document.querySelector(".new-todo");
const ul = document.querySelector(".todo-list");
const total = document.querySelector(".todo-count");
const totalNum = total.querySelector("strong");
const filters = document.querySelector(".filters");

//count id setting

todoList = [];
//get info from input
input.addEventListener("keypress", (e) => {
  if (input.value && e.key === "Enter") {
    addTodos(input.value);
    input.value = "";
  }
});

//handling add
function addTodos(item) {
  todoList.push({
    id: Date.now(),
    content: item,
    isCompleted: false,
  });
  console.log(todoList);
  totalNum.innerText = todoList.length;
  render(todoList);
}

function render(todoList) {
  const todos = todoList
    .map(
      (todo) => `<li id=${todo.id} class=${todo.isCompleted ? "completed" : ""}>
   <div class="view">
     <input class="toggle" type="checkbox" ${
       todo.isCompleted ? "checked" : ""
     } />
    <label class="label">${todo.content}</label>
     <button class="destroy"></button>
   </div>
   <input class="edit" value="${todo.content}" />
   </li>`
    )
    .join("");
  return (ul.innerHTML = todos);
}

//handling destroy and toggle checkbox
ul.addEventListener("click", (e) => {
  const eId = parseInt(e.target.closest("li").id);
  if (e.target.className === "destroy") {
    todoList = todoList.filter((todo) => todo.id !== eId);
    render(todoList);
    totalNum.innerText = todoList.length;
  }
  if (e.target.className === "toggle") {
    todoList = todoList.map((todo) => {
      if (todo.id === eId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    render(todoList);
  }
});

//handle Editing
ul.addEventListener("dblclick", (e) => handleEditing(e));
function handleEditing(e) {
  const selected = e.target;
  selected.closest("li").classList.toggle("editing");
  console.log(selected.closest("li"));
  selected.closest("li").addEventListener("keydown", (e) => {
    const eId = parseInt(e.target.closest("li").id);
    if (e.key === "Enter") {
      todoList = todoList.map((todo) => {
        if (todo.id === eId) {
          return { ...todo, content: e.target.value };
        }
        return todo;
      });
      render(todoList);
    }
    if (e.key === "Escape") {
      render(todoList);
    }
  });
}

//filtering
filters.addEventListener("click", (e) => {
  const prev = e.currentTarget.querySelector(".selected");
  prev.classList.toggle("selected");
  const now = e.target;
  now.classList.toggle("selected");
  handleFiltering(now.className);
});

function handleFiltering(condition) {
  if (condition.startsWith("completed")) {
    completedTodos = todoList.filter((todo) => todo.isCompleted);
    render(completedTodos);
  } else if (condition.startsWith("active")) {
    activeTodos = todoList.filter((todo) => !todo.isCompleted);
    render(activeTodos);
  } else {
    render(todoList);
  }
}
