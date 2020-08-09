import { VIEW, EDITING, COMPLETED } from "./TodoItem.js";

export default function TodoList(
  $todoList,
  { changeStatus, removeItem, editItem }
) {
  $todoList.addEventListener("click", (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    if ($target.classList.contains("toggle")) {
      changeStatus($li.id, $target.checked ? COMPLETED : VIEW);
      return;
    }

    if ($target.classList.contains("destroy")) {
      removeItem($li.id);
      return;
    }
  });

  // 더블 클릭 시 todo 수정
  $todoList.addEventListener("dblclick", (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    if ($target.classList.contains("label") && $li.classList.contains("view")) {
      changeStatus($li.id, EDITING);
    }
  });

  $todoList.addEventListener("keydown", (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    const editKeydown = () => {
      if ($target.value && event.key === "Enter") {
        editItem($li.id, $target.value);
        changeStatus($li.id, VIEW);
      }

      if (event.key === "Escape") {
        changeStatus($li.id, VIEW);
        $target.value = $li.querySelector(".label").textContent;
      }
    };

    if ($target.classList.contains("edit")) {
      editKeydown();
    }
  });

  this.todoItemTemplate = (todoItem) => `
    <li id="item-${todoItem.id}" class="${todoItem.status}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todoItem.status === COMPLETED ? "checked" : ""
            }/>
            <label class="label">${todoItem.contents}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoItem.contents}" />
    </li>    
  `;

  this.render = (todoItems) => {
    const template = todoItems.map(this.todoItemTemplate);
    $todoList.innerHTML = template.join("");
  };
}
