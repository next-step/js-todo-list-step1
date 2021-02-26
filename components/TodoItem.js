import { KEYS } from "../utils/constants.js";

export default class TodoItem {
  item;
  onRemove;
  onCheckedToggle;
  onTitleChange;

  constructor(item, onRemove, onCheckedToggle, onTitleChange) {
    this.item = item;
    this.onRemove = onRemove;
    this.onCheckedToggle = onCheckedToggle;
    this.onTitleChange = onTitleChange;
  }

  makeTemplate({ id, title, isCompleted }) {
    const $li = document.createElement("li");

    if (isCompleted) $li.classList.add("completed");

    $li.innerHTML = `
             <div class="view">
                <input class="toggle" type="checkbox" ${
                  isCompleted ? "checked" : ""
                }/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${title}" />
          `;

    $li.addEventListener("dblclick", (event) => {
      $li.classList.add("editing");
    });

    const $destroyBtn = $li.querySelector(".destroy");
    $destroyBtn.addEventListener("click", () => {
      this.onRemove(id);
    });

    const $toggleInput = $li.querySelector(".toggle");
    $toggleInput.addEventListener("change", () => {
      this.onCheckedToggle(id);
    });

    const $editInput = $li.querySelector(".edit");

    $editInput.addEventListener("keyup", (event) => {
      if (event.key === KEYS.ESCAPE) {
        $li.classList.remove("editing");
        $editInput.value = title;
        return;
      }

      if (event.key === KEYS.ENTER) {
        $li.classList.remove("editing");
        this.onTitleChange(id, $editInput.value);
      }
    });

    return $li;
  }

  render() {
    return this.makeTemplate(this.item);
  }
}
