import { TodoItem } from "./TodoItem.js";
import { $, $$ } from "../../util/domSelection.js";
export class TodoStatusContainer {
  constructor() {
    const filters = {
      activeFilter: {
        button: $(".count-container ." + TodoItem.ACTIVE),
        name: TodoItem.ACTIVE,
      },
      completedFilter: {
        button: $(".count-container ." + TodoItem.COMPLETED),
        name: TodoItem.COMPLETED,
      },
      allFilter: { button: $(".count-container .all"), name: "all" },
    };

    const hideSelectedFilter = () =>
      $$(".count-container a").forEach((button) =>
        button.classList.remove("selected")
      );
    const showSelectedFilter = (selectedFilter) => {
      const todoListLi = $$("#todo-list li");
      selectedFilter.button.classList.add("selected");
      if (selectedFilter.name == "all") {
        todoListLi.forEach((li) => (li.style.display = ""));
        return;
      }
      todoListLi.forEach((li) => {
        if (!li.classList.contains(selectedFilter.name))
          li.style.display = "none";
        else li.style.display = "";
      });
    };

    Object.entries(filters).forEach(([key, filter]) => {
      filter.button.addEventListener("click", (e) => {
        e.preventDefault();
        hideSelectedFilter();
        showSelectedFilter(filter);
        this.setState();
      });
    });
  }
  setState() {
    let count = 0;
    $$("#todo-list li").forEach((li) => {
      if (li.style.display != "none") count = count + 1;
    });
    $(".todo-count strong").textContent = count;
  }
}
