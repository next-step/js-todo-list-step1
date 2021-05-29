export let todoList = [];
export let listStatus = "all";
export let is_complete = true;

export const addList = (value) => {
  const id = todoList.length == 0 ? 0 : todoList[todoList.length - 1].id + 1;
  todoList.push({
    id: id,
    title: value,
    complete: false,
  });
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

export const modifyItem = (id, title) => {
  todoList.map((td) => {
    if (td.id == id) td.title = title;
  });
};

export const setStatus = (status) => {
  listStatus = status;
  if (listStatus == "active") is_complete = false;
  if (listStatus == "completed") is_complete = true;
};
