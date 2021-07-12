export const getTodoData = () => {
  return JSON.parse(localStorage.getItem('items'));
}

export const setTodoData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}
