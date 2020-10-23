import {
  insertTodo,
  removeTodo,
  toggleTodo,
  updateTodo
} from "../reducer/todo.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

const getNewTodo = todos => {
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

  const targetId = parseInt(index, 10);

  func(targetId);
};

export default store => {
  const insertTodoItem = text => store.dispatch(insertTodo(text));
  const removeTodoItem = id => store.dispatch(removeTodo(id));
  const toggleTodoItem = id => store.dispatch(toggleTodo(id));
  const updateTodoItem = (id, text) => store.dispatch(updateTodo(id, text));

  const onDestroy = ({ target }) => {
    targetEvent(target, removeTodoItem);
  };

  const onToggle = ({ target }) => {
    targetEvent(target, toggleTodoItem);
  };

  const onEdit = ({ target }) => {
    const targetId = parseInt(target.dataset.index, 10);
    const targetValue = target.value;

    updateTodoItem(targetId, targetValue);
  };

  const todoSubscribe = () => {
    const { todos } = store.getState();

    if (!todos) {
      return;
    }

    TodoList({
      todos: getNewTodo(todos),
      onDestroy,
      onToggle,
      onEdit
    });
  };

  const hashChange = () => {
    const filter = document.querySelector(".filters");
    const tabs = filter.querySelectorAll("a");

    const selected = location.hash.split("#")[1] || "all";

    const selectedTab = filter.getElementsByClassName(selected);

    if (!selectedTab) {
      return;
    }

    tabs.forEach(tab => tab.classList.remove("selected"));

    selectedTab[0].classList.add("selected");

    todoSubscribe("HASH_CHANGE");
  };

  window.addEventListener("hashchange", hashChange);

  TodoInput(insertTodoItem);

  store.subscribe(todoSubscribe);
};
