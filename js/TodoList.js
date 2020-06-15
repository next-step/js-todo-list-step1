export default class TodoList {
  constructor({ data, $target, onToggle, onRemove, onEdit }) {
    (this.data = data), (this.$target = $target);

    this.$target.addEventListener("click", (e) => {
      const $targetClassName = e.target.className;
      switch ($targetClassName) {
        case "toggle":
          onToggle(e.target.closest("li").dataset.id);
          break;
        case "destroy":
          onRemove(e.target.closest("li").dataset.id);
          break;
        default:
          console.log("NO MATCH CLASSNAME");
          break;
      }
    });
    this.$target.addEventListener("dblclick", (e) => {
      const $targetClassName = e.target.className;
      if ($targetClassName === "label") {
        e.target.closest("li").className = "editing";
        e.target.closest("li").querySelector(".edit").focus();
      }
    });
    this.$target.addEventListener("keyup", (e) => {
      const $targetClassName = e.target.className;
      if ($targetClassName === "edit") {
        if (e.key === "Escape") {
          if (e.target.closest("li").querySelector(".toggle").checked) {
            e.target.closest("li").className = "completed";
          } else {
            e.target.closest("li").className = "";
          }
        } else if (e.key === "Enter") {
          const id = e.target.closest("li").dataset.id;
          const text = e.target.value;
          onEdit(id, text);
          if (e.target.closest("li").querySelector(".toggle").checked) {
            e.target.closest("li").className = "completed";
          } else {
            e.target.closest("li").className = "";
          }
        }
      }
    });
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    const renderedHTML = this.data
      .map((todo) => {
        console.log(todo.text);
        return `
          <li ${todo.isCompleted ? "class=completed" : ""} data-id=${todo.id}>
            <div class="view">
              <input class="toggle" type="checkbox" 
              ${todo.isCompleted ? "checked" : ""} 
              />
              <label class="label">${todo.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" placeholder="${todo.text}" value="" />
          </li>
        `;
      })
      .join("");
    this.$target.innerHTML = renderedHTML;
  }
}
