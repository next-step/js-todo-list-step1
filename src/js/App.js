import { TodoInput } from "./component/TodoInput.js";
import { TodoList } from "./component/TodoList.js";
import { $ } from "./utils/utils.js";

let todoList = [];
let listStatus = "all";

const addList = (value) => {
  const id = todoList.length == 0 ? 0 : todoList[todoList.length - 1].id + 1;
  todoList.push({
    id: id,
    title: value,
    complete: false,
  });
  drawList(todoList, listStatus);
};

TodoInput(addList);
const drawList = TodoList(todoList, listStatus);
// TodoList();
