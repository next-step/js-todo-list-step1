import { VIEW, EDITING, COMPLETED } from "./TodoItem.js";

export default function TodoList(
  $todoList,
  { changeStatus, removeItem, editItem }
) {
  const onClickItem = (event) => {
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
  };

  const onDblclickItem = (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    if ($target.classList.contains("label") && $li.classList.contains("view")) {
      changeStatus($li.id, EDITING);
    }
  };

  const onKeydownItem = (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    const onEditKeydown = () => {
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
      onEditKeydown();
    }
  };

  $todoList.addEventListener("click", onClickItem);
  $todoList.addEventListener("dblclick", onDblclickItem);
  $todoList.addEventListener("keydown", onKeydownItem);

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
