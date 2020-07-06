const TODOS_LS = "todos";

export const saveTodos = (todos) => {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
};

export const loadTodos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  return JSON.parse(loadedToDos);
};
