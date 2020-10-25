const titleInput = document.getElementById("new-todo-title");
const list = document.getElementById("todo-list");
const listItems = list.childNodes;

const countEl = document.getElementsByClassName("todo-count")[0].children[0];

const allBtn = document.getElementsByClassName("all")[0];
const activeBtn = document.getElementsByClassName("active")[0];
const completedBtn = document.getElementsByClassName("completed")[0];

export {
  titleInput,
  list,
  listItems,
  countEl,
  allBtn,
  activeBtn,
  completedBtn,
};
