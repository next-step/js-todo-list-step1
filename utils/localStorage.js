const TODO_DATA = "todos";

export const loadTodos = () => {
    const todos = localStorage.getItem(TODO_DATA);
    return JSON.parse(todos);
};

export const saveTodos = (todos) => {
    localStorage.setItem(TODO_DATA, JSON.stringify(todos));
};