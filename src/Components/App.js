import {
  insertTodo,
  removeTodo,
  toggleTodo,
  updateTodo
} from "../reducer/todo.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default store => {
  const insertTodoItem = text => store.dispatch(insertTodo(text));
  const removeTodoItem = id => store.dispatch(removeTodo(id));
  const toggleTodoItem = id => store.dispatch(toggleTodo(id));
  const updateTodoItem = (id, text) => store.dispatch(updateTodo(id, text));

  TodoInput(insertTodoItem);

  store.subscribe(() => {
    TodoList(store.getState());
  });
};
