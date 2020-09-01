import { isFunction } from "../utils.js";

function TodoInput($target, eventHandler) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  if (!eventHandler || !isFunction(eventHandler.onSubmit)) {
    throw new Error("Wrong eventHandler");
  }

  this.bindEvent = () => {
    $target.addEventListener("submit", (event) => {
      event.preventDefault();

      const contentText = this.$inputElem.value.trim();
      if (contentText === "") {
        console.log("Empty input");
        return;
      }
      eventHandler.onSubmit(contentText);
      this.$inputElem.value = "";
    });
  };

  this.render = () => {
    $target.innerHTML = `
      <label for="todo-input-from">
          <form id="todo-input-form">
            <input
                class="new-todo"
                placeholder="할일을 추가해주세요"
                autofocus
            />
          </form>
      </label>
    `;
    this.$inputElem = document.querySelector(".new-todo");
  };

  this.render();
  this.bindEvent();
}

export default TodoInput;
