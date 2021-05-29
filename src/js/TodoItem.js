import { drawList } from "./component/TodoList.js";
export let todoList = [];
export let listStatus = "all";

export const addList = (value) => {
  const id = todoList.length == 0 ? 0 : todoList[todoList.length - 1].id + 1;
  todoList.push({
    id: id,
    title: value,
    complete: false,
  });
  drawList();
};
export const changeComplete = (id) => {
  todoList.forEach((l) => {
    if (l.id == id) {
      l.complete = !l.complete;
      return;
    }
  });
};
export const deleteItem = (id) => {
  todoList = todoList.filter((td) => td.id != id);
};
