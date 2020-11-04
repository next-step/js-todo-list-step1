const STORE_KEY = "todo-list";
let toDos = [];

export function getTodoList() {
  const todoList = localStorage.getItem(STORE_KEY);
  if (todoList !== null) {
    const parseToDo = JSON.parse(todoList);
    parseToDo.forEach(todo => {
      toDos.push(todo);
    });
  }

  return toDos;
}

export function setTodo(data) {
  toDos = data;
  localStorage.setItem(STORE_KEY, JSON.stringify(toDos));
}
