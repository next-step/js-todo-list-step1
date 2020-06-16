import { KEYNAME, ERRORTYPE } from "./utils/constants.js";
import * as template from "./utils/templates.js";

export default class TodoList {
  filteredData = null;
  constructor({
    data,
    $target,
    $targetTodoFilters,
    $targetTodoToggleAll,
    onToggle,
    onToggleAll,
    onRemove,
    onEdit,
  }) {
    this.data = data;
    this.$target = $target;
    this.$targetTodoFilters = $targetTodoFilters;
    this.$targetTodoToggleAll = $targetTodoToggleAll;

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
          console.error(ERRORTYPE.NOMATCHCLASS);
          break;
      }
    });

    let toggleBoolean = true;
    this.$targetTodoToggleAll.addEventListener("click", (e) => {
      const { className } = e.target;
      if (className === "toggle-all-label") {
        onToggleAll(toggleBoolean);
        toggleBoolean = !toggleBoolean;
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
        if (e.key === KEYNAME.ESC) {
          if (e.target.closest("li").querySelector(".toggle").checked) {
            e.target.closest("li").className = "completed";
          } else {
            e.target.closest("li").className = "";
          }
        } else if (e.key === KEYNAME.ENTER) {
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
        console.error(ERRORTYPE.NOMATCHFILTER);
        break;
    }

    this.$target.innerHTML =
      this.filteredData && template.TODOLIST(this.filteredData);
  }
}
