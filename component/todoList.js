import { todoListEl, toDoInput } from "./constant.js";
import { toDos } from "../init.js";
import { saveToDos } from "./todoLocalStorage.js";
import { handleCount } from "./todoCount.js";
import { renderFromFilter } from "./todoFilter.js";
import { filterToDos } from "../init.js";

const addToDos = (item) => {
  todoListEl.insertAdjacentHTML("beforeend", renderTodoItemTemplate(item));
  toDoInput.value = "";
};

const addToItems = (item) => {
  toDos.push(item);
};

const renderTodoItemTemplate = (item) => {
  return `<li data-id="${item.id}" class="${item.completed ? "completed" : ""}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              item.completed ? "checked" : ""
            }/>
            <label class="label">${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}" />
    </li>`;
};

const handleTodoItemClick = (event) => {
  const targetClass = event.target.className.split(" ");

  if (targetClass[0] === "toggle") handleComplete(event);
  else if (targetClass[0] === "destroy") handleDestory(event);
};

const handleNewTodoSubmit = async (event) => {
  const newItem = {
    id: Date.now(),
    title: event.target.value,
    completed: false,
  };

  addToItems(newItem);
  addToDos(newItem);
  handleCount(toDos.length);
  saveToDos();
  renderFromFilter();
};

const handleComplete = (event) => {
  event.target.closest("li").classList.toggle("completed");
  event.target.closest("input").classList.toggle("checked");
  todoCompleted(event);
  renderFromFilter();
};

const handleDestory = (event) => {
  const li = event.target.parentNode.parentNode;
  removeFromItems(li);
  todoListEl.removeChild(li);
  handleCount(toDos.length);
};

const removeFromItems = (li) => {
  try {
    const todoItemId = li.dataset.id;
    filterToDos(toDos, todoItemId);
  } catch (error) {
    console.log(error);
  }
};

const todoCompleted = (event) => {
  const currentLi = event.target.closest("li");

  const currentItemId = currentLi.dataset.id;

  for (let obj of toDos) {
    if (obj.completed === false && obj.id === parseInt(currentItemId)) {
      obj.completed = true;
    } else if (obj.completed === true && obj.id === parseInt(currentItemId)) {
      obj.completed = false;
    }
  }

  saveToDos();
};

export { addToDos, addToItems, handleTodoItemClick, handleNewTodoSubmit };
