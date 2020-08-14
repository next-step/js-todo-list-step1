import { isValidTodoItems, isFunction, ESC_KEY } from "../utils.js";

function TodoList($target, todoItems, eventHandler) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  if (!isValidTodoItems(todoItems)) {
    throw new Error("wrong data");
  }

  if (
    !eventHandler ||
    !isFunction(eventHandler.toggleTodoById) ||
    !isFunction(eventHandler.deleteTodoById) ||
    !isFunction(eventHandler.editTodoById)
  ) {
    throw new Error("Wrong eventHandler");
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
      if (event.target.classList.contains("toggle")) {
        const id = event.target.closest("li").id;
        eventHandler.toggleTodoById(id);
      }

      if (event.target.classList.contains("edit")) {
        const id = event.target.closest("li").id;
        const content = event.target.value;
        eventHandler.editTodoById(id, content);
      }
    });

    $target.addEventListener("click", (event) => {
      if (event.target.classList.contains("destroy")) {
        const id = event.target.closest("li").id;
        eventHandler.deleteTodoById(id);
      }
    });

    $target.addEventListener("keydown", (event) => {
      if (event.key === ESC_KEY) {
        this.stopEditing();
      }
    });

    $target.addEventListener("dblclick", (event) => {
      const itemElem = event.target.closest("li");
      if (!itemElem) {
        return;
      }
      this.stopEditing();
      itemElem.classList.add("editing");
      const editElem = itemElem.querySelector(".edit");
      editElem.focus();
      editElem.selectionStart = editElem.selectionEnd = editElem.value.length;
    });
  };

  this.stopEditing = () => {
    const editingItems = $target.querySelectorAll(".editing");
    if (!editingItems) {
      return;
    }
    editingItems.forEach((itemElem) => {
      const prevContent = itemElem.querySelector("label").innerText;
      const editElem = itemElem.querySelector(".edit");
      editElem.value = prevContent;
      itemElem.classList.remove("editing");
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
          : `<li id="${_id}">
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
