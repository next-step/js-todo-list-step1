import { isValidTodoItems } from "../utils.js";

function TodoList($target, todoItems, eventHandler) {
  if (!this instanceof TodoList) {
    throw new Error("Create instance with 'new'");
  }

  if (!isValidTodoItems(todoItems)) {
    throw new Error("wrong data");
  }

  this.todoItems = todoItems;

  if (!eventHandler) {
    throw new Error("Wrong eventHandler");
  }

  this.setState = (newTodoItems) => {
    if (!isValidTodoItems(newTodoItems)) {
      throw new Error("wrong data");
    }
    this.todoItems = newTodoItems;
    this.render();
  };

  this.render = () => {
    const todoItemsHTML = this.todoItems
      .map(({ content, isCompleted }) =>
        isCompleted
          ? `<li class="completed"> 
                <label>${content}</label> 
             </li>`
          : `<li>
                <label>${content}</label>
            </li>`
      )
      .join(" ");

    $target.innerHTML = `
        <ul class="todo-list">
            ${todoItemsHTML}
        </ul>
    `;
  };

  this.render();
}

export default TodoList;
