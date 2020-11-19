const titleInput = document.getElementById("new-todo-title");
const list = document.getElementById("todo-list");
const listItems = list.childNodes;

const countEl = document.querySelector(".todo-count strong");

const [allBtn, activeBtn, completedBtn] = document.querySelectorAll(
  ".filters a"
);

export {
  titleInput,
  list,
  listItems,
  countEl,
  allBtn,
  activeBtn,
  completedBtn,
};
