import { hasClass } from "./utils.js";
import { ENTER_KEY, ESCAPE_KEY } from "./constants.js";

export default class TodoList {
  $target = null;
  data = null;
  onDelete = null;
  onEdit = null;
  onComplete = null;

  constructor({ $target, onDelete, onEdit, onComplete, data }) {
    this.data = data;
    this.$target = $target.querySelector(".todo-list");
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.onComplete = onComplete;
    this.render();
  }

  bindEvents = () => {
    document.querySelectorAll(".item").forEach((item, i) => {
      item.addEventListener("click", (e) => {
        if (hasClass(e.target, "toggle")) {
          if (e.target.checked) {
            this.onComplete("completed", i);
          } else {
            this.onComplete("active", i);
          }
        }

        if (hasClass(e.target, "destroy")) this.onDelete(i);
      });

      item.addEventListener("dblclick", (e) => {
        const closestLi = e.target.closest("li");
        const editInput = closestLi.querySelector(".edit");
        const originValue = editInput.value;
        closestLi.classList.add("editing");
        editInput.focus();
        editInput.value = "";
        editInput.value = originValue;
        editInput.addEventListener("keyup", (e) => {
          if (e.key === ESCAPE_KEY) {
            closestLi.classList.remove("editing");
            editInput.value = originValue;
          }

          if (e.key === ENTER_KEY) {
            this.onEdit(editInput.value, i);
          }
        });
      });
    });
  };

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!!this.data?.todoItems === false) return;
    this.$target.innerHTML = this.data.todoItems
      .map((todoItem) => {
        if (todoItem.status === "completed") {
          return `<li class="item completed">
                      <div class="view">
                        <input class="toggle" type="checkbox" checked/>
                        <label class="label">${todoItem.content}</label>
                        <button class="destroy"></button>
                      </div>
                      <input class="edit" value="${todoItem.content}" />
                  </li>`;
        } else {
          return `<li class="item">
                      <div class="view">
                        <input class="toggle" type="checkbox"/>
                        <label class="label">${todoItem.content}</label>
                        <button class="destroy"></button>
                      </div>
                      <input class="edit" value="${todoItem.content}" />
                  </li>`;
        }
      })
      .join(" ");
    this.bindEvents();
  }
}
