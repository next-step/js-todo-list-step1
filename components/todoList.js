function TodoList({ onAction }) {
  this.onAction = onAction;
  const $ul = document.querySelector(".todo-list");
  const $filters = document.querySelector(".filters");
  this.render = (todoList) => {
    const todos = todoList
      .map(
        (todo) => `<li id=${todo.id} class=${
          todo.isCompleted ? "completed" : ""
        }>
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
    return ($ul.innerHTML = todos);
  };

  //handling destroy and toggle checkbox
  $ul.addEventListener("click", (e) => {
    const eId = parseInt(e.target.closest("li").id);
    if (e.target.className === "destroy") {
      this.onAction.delete(eId);
    }
    if (e.target.className === "toggle") {
      this.onAction.toggle(eId);
    }
  });

  //filtering
  $filters.addEventListener("click", (e) => {
    const prev = e.currentTarget.querySelector(".selected");
    prev.classList.toggle("selected");
    const now = e.target;
    now.classList.toggle("selected");
    this.onAction.filter(now.className);
  });
  //handle Editing
  const editing = (e) => {
    const selected = e.target.closest("li");
    selected.classList.toggle("editing");
    selected.addEventListener("keydown", (e) => {
      const eId = parseInt(e.target.closest("li").id);
      if (e.key === "Enter") {
        this.onAction.edit(eId, e.target.value);
      }
      if (e.key === "Escape") {
        this.onAction.render();
      }
    });
  };
  $ul.addEventListener("dblclick", editing);
}
export default TodoList;
