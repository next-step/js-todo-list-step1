export default class TodoList {
  filteredData = null;
  constructor({
    data,
    $target,
    $targetTodoFilters,
    onToggle,
    onRemove,
    onEdit,
  }) {
    this.data = data;
    this.$target = $target;
    this.$targetTodoFilters = $targetTodoFilters;

    this.$target.addEventListener("click", (e) => {
      const { className } = e.target;
      switch (className) {
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
      const { className } = e.target;
      if (className === "label") {
        e.target.closest("li").className = "editing";
        e.target.closest("li").querySelector(".edit").focus();
      }
    });
    this.$target.addEventListener("keyup", (e) => {
      const { className } = e.target;
      if (className === "edit") {
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
    const filterDOMList = this.$targetTodoFilters.querySelectorAll("li a");
    let selectedDOMClassName = undefined;
    for (let node of filterDOMList.values()) {
      if (node.classList.contains("selected")) {
        selectedDOMClassName = node.classList[0];
        break;
      }
    }
    switch (selectedDOMClassName) {
      case "all":
        this.filteredData = this.data;
        break;
      case "active":
        this.filteredData = this.data.filter(
          (todo) => todo.isCompleted === false
        );
        break;

      case "completed":
        this.filteredData = this.data.filter(
          (todo) => todo.isCompleted === true
        );
        break;
      default:
        console.log("NO MATCH CLASSNAME");
        break;
    }

    const renderedHTML =
      this.filteredData &&
      this.filteredData
        .map((todo) => {
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
