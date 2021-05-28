function TodoList({ onDelete, onComplete }) {
  this.$todoList = document.getElementById("todo-list");

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
    this.registerEventHandler();
  };

  this.render = (items) => {
    if (!items) return;
    const template = items.map((item) => {
      return `<li class=${item.completed ? "completed" : ""} ${item.editing ? "editing" : ""}> 
      <div class= "view">
        <input class="toggle" data-id=${item.id} type="checkbox" ${
        item.completed ? "checked" : ""
      }/>
        <label class="label" data-id=${item.id}>${item.contents}</label>
        <button data-id=${item.id} class="destroy"></button>
      </div>
      <input  class="edit" value="${item.contents}" />
    </li>`;
    });

    this.$todoList.innerHTML = template.join("");
  };

  this.registerEventHandler = () => {
    const deleteButtons = document.querySelectorAll(".destroy");
    const completeButtons = document.querySelectorAll(".toggle");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => onDelete(e.target.dataset.id));
    });

    completeButtons.forEach((button) => {
      button.addEventListener("click", (e) => onComplete(e.target.dataset.id));
    });
  };
}

export default TodoList;
