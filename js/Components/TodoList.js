import { isValidTodoItems, isFunction } from "../utils.js";

function TodoList($target, todoItems, eventHandler) {
  if (!this instanceof TodoList) {
    throw new Error("Create instance with 'new'");
  }

  if (
    !isValidTodoItems(todoItems) ||
    !isFunction(eventHandler.toggleTodoById) ||
    !isFunction(eventHandler.deleteTodoById)
  ) {
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

  this.bindEvent = () => {
    $target.addEventListener("change", (event) => {
      if (event.target.nodeName === "INPUT") {
        const id = event.target.closest("li").id;
        eventHandler.toggleTodoById(id);
      }
    });

    $target.addEventListener("click", (event) => {
      if (event.target.nodeName === "BUTTON") {
        const id = event.target.closest("li").id;
        eventHandler.deleteTodoById(id);
      }
    });
  };

  this.render = () => {
    const todoItemsHTML = this.todoItems
      .map(({ content, isCompleted, _id }) =>
        isCompleted
          ? `<li id="${_id}" class="completed"> 
                <div class="view">
                  <input class="toggle" type="checkbox" checked/>
                  <label>${content}</label> 
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="${content}" />
             </li>`
          : `<li id="${_id}"}>
                <div class="view">
                  <input class="toggle" type="checkbox"/>
                  <label>${content}</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="${content}" />
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
  this.bindEvent();
}

export default TodoList;
