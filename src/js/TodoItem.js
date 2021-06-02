export let todoList = [];
export let listStatus = "all";
export let isComplete = true;

export function TodoItem() {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  if (todoList == undefined) todoList = [];
}

export const addList = (value) => {
  const id = todoList.length == 0 ? 0 : todoList[todoList.length - 1].id + 1;
  todoList.push({
    id,
    title: value,
    complete: false,
  });
  saveLocalStroge();
};
export const changeComplete = (id) => {
  todoList.forEach((l) => {
    if (l.id == id) {
      l.complete = !l.complete;
      saveLocalStroge();
      return;
    }
  });
};
export const deleteItem = (id) => {
  todoList = todoList.filter((td) => td.id != id);
  saveLocalStroge();
};

export const modifyItem = (id, title) => {
  todoList.map((td) => {
    if (td.id == id) td.title = title;
  });
  saveLocalStroge();
};

export const setStatus = (status) => {
  listStatus = status;
  if (listStatus == "active") isComplete = false;
  if (listStatus == "completed") isComplete = true;
};

export const saveLocalStroge = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};
