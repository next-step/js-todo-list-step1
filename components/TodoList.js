import { ENTER_KEY_CODE, ESCAPE_KEY_CODE } from "../utils/constantsKey.js";

function TodoList(element, todos, { onAction }) {
  if (!(this instanceof TodoList)) {
    throw new Error("error: TodoList must be called with new!");
  }

  this.$list = element;
  this.todos = todos;
  this.onAction = onAction;

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => {
    if (!this.todos.length) {
      this.$list.innerHTML = "";
      return;
    }

    const htmlString = this.todos
      .map((todo, idx) => {
        const { content, isCompleted = false } = todo;

        if (!content) return;

        return `<li data-idx=${idx} class=${isCompleted ? "completed" : ""}>
          <div class="view">
            <input class="toggle" type="checkbox" ${
              isCompleted ? "checked" : ""
            }>
            <label class="label">${content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}">
        </li>`;
      })
      .join("");

    this.$list.innerHTML = htmlString;
  };

  this.init = () => {
    this.render();
  };

  this.init();

  this.$list.addEventListener("click", (e) => {
    const { className, nodeName } = e.target;

    // onToggle
    if (className === "toggle" && nodeName === "INPUT") {
      const idx = e.target.closest("li").dataset.idx;
      this.onAction.toggle(idx);
    }

    // onRemove
    if (className === "destroy" && nodeName === "BUTTON") {
      const idx = e.target.closest("li").dataset.idx;
      this.onAction.remove(idx);
    }
  });

  this.$list.addEventListener("dblclick", (e) => {
    const { className, nodeName } = e.target;

    // onUpdate
    if (className === "label" && nodeName === "LABEL") {
      const $li = e.target.closest("li");
      $li.classList.add("editing");

      const $input = $li.querySelector("input.edit");
      $input.focus();
      $input.setSelectionRange($input.value.length, $input.value.length);
      this.originValue = $input.value; // escape 시 값 변경 판단
    }
  });

  this.$list.addEventListener("keyup", (e) => {
    const {
      target: { value },
      keyCode,
    } = e;
    const $li = e.target.closest("li");

    if (keyCode === ENTER_KEY_CODE && value) {
      this.onAction.change({ idx: $li.dataset.idx, content: value });
      $li.classList.remove("editing");
    }

    if (keyCode === ESCAPE_KEY_CODE && this.originValue === value) {
      $li.classList.remove("editing");
    }
  });
}

export default TodoList;
