import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import {
  initTodo,
  insertTodo,
  removeTodo,
  toggleTodo,
  updateTodo
} from "../reducer/todo.js";

const getTodos = todos => {
  if (location.hash === "#active") {
    return todos.filter(todo => !todo.completed);
  }
  if (location.hash === "#completed") {
    return todos.filter(todo => todo.completed);
  }
  return todos;
};

const targetEvent = (target, func) => {
  const {
    dataset: { index }
  } = target.parentElement;

  func(index);
};

const persistToDos = todos => {
  const stringToDo = JSON.stringify(todos);
  localStorage.setItem("todos", stringToDo);
};

export default store => {
  const insertTodoItem = text => store.dispatch(insertTodo(text));
  const removeTodoItem = id => store.dispatch(removeTodo(id));
  const toggleTodoItem = id => store.dispatch(toggleTodo(id));
  const updateTodoItem = (id, text) => store.dispatch(updateTodo(id, text));

  const loadToDos = () => {
    const loadedToDos = localStorage.getItem("todos");
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      store.dispatch(initTodo(parsedToDos));
    }
  };

  const onDestroy = ({ target }) => {
    targetEvent(target, removeTodoItem);
  };

  const onToggle = ({ target }) => {
    targetEvent(target, toggleTodoItem);
  };

  const onEdit = ({ target }) => {
    const targetId = target.dataset.index;
    const targetValue = target.value;

    updateTodoItem(targetId, targetValue);
  };

  const todoSubscribe = () => {
    const { todos } = store.getState();

    if (!todos) {
      return;
    }

    TodoList({
      todos: getTodos(todos),
      onDestroy,
      onToggle,
      onEdit
    });

    persistToDos(todos);
  };

  const locationChange = () => {
    const filter = document.querySelector(".filters");
    const tabs = filter.querySelectorAll("a");

    const [, selected = "all"] = location.hash.split("#");

    const [selectedTab] = filter.getElementsByClassName(selected);

    if (!selectedTab) {
      return;
    }

    tabs.forEach(tab => tab.classList.remove("selected"));

    selectedTab.classList.add("selected");

    todoSubscribe();
  };

  window.addEventListener("hashchange", locationChange);
  window.addEventListener("DOMContentLoaded", locationChange);

  store.subscribe(todoSubscribe);

  TodoInput(insertTodoItem);
  loadToDos();
};
