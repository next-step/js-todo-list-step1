import { todoItemTemplate } from "./TodoItem.js";
import { $ } from "../util/util.js";

export default function TodoList() {
  this.$todoList = $("#todo-list");
  this.todoItems = [];
  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("\n");
  };

  this.$todoList.addEventListener("click", (event) => {
    if (event === undefined || event.target === undefined) {
      console.log("event가 존재 하지 않습니다.");
      return;
    }
    const $target = event.target;

    const $item = $target.closest("li");
    if ($target.nodeName === "INPUT" && $target.classList.contains("toggle")) {
      $target.setAttribute("checked", "");
      $item.classList.toggle("completed");
    } else if (
      $target.nodeName === "BUTTON" &&
      $target.classList.contains("destroy")
    ) {
      const deleteIndex = this.todoItems.findIndex(
        (item) => item.id == $item.id
      );
      if (confirm("정말 삭제 하시겠습니까?") && deleteIndex > -1) {
        this.todoItems.splice(deleteIndex, 1);
        this.setState(this.todoItems);
      }
    }
  });

  this.$todoList.addEventListener("dblclick", (event) => {
    if (event === undefined || event.target === undefined) {
      console.log("event가 존재 하지 않습니다.");
      return;
    }
    const $target = event.target;

    const $item = $target.closest("li");
    if ($target.nodeName === "LABEL" && $target.classList.contains("label")) {
      // edit모드로 변경
      $item.classList.remove("completed");
      $item.classList.add("editing");

      $target.previousElementSibling.removeAttribute("checked");
      $target.closest("div").nextElementSibling.focus();
    }
  });

  this.$todoList.addEventListener("keydown", (event) => {
    if (event === undefined || event.target === undefined) {
      console.log("event가 존재 하지 않습니다.");
      return;
    }
    const $target = event.target;

    if ($target.nodeName === "INPUT" && $target.classList.contains("edit")) {
      // edit input에 대한 keypress 이벤트 처리
      const $item = $target.closest("li");
      const $viewInput = Array.from(
        $target.previousElementSibling.children
      ).find(
        (element) =>
          element.nodeName === "LABEL" && element.classList.contains("label")
      );

      if (event.key === "Enter") {
        $viewInput.innerHTML = $target.value;
        $item.classList.remove("editing");
      } else if (event.key === "Escape") {
        $target.value = $viewInput.innerHTML;
        $item.classList.remove("editing");
      }
    }
  });
}
