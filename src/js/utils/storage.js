const storage = window.localStorage;

export const getTodoData = () => {
  return JSON.parse(storage.getItem('items')) || [];
}

export const setTodoData = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
}
