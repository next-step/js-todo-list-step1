import TodoCount from "./components/todoCount.js";
import TodoInput from "./components/todoInput.js";
import TodoList from "./components/todoList.js";

let todoList = [];

const todoInput = new TodoInput({ onAction: { add: addTodos } });
const todoShow = new TodoList({
  onAction: {
    toggle: onToggle,
    delete: onDelete,
    filter: handleFiltering,
    edit: handleEditing,
    render: handleRender,
  },
});
const todoCount = new TodoCount();

todoList = JSON.parse(localStorage.getItem("TODOS"));
handleRender();

if (!todoList) {
  todoList = [];
}
//handling add
function addTodos(item) {
  todoList.push({
    id: Date.now(),
    content: item,
    isCompleted: false,
  });
  localStorage.setItem("TODOS", JSON.stringify(todoList));
  todoCount.showCount(todoList);
  todoShow.render(todoList);
}

function onDelete(eId) {
  todoList = todoList.filter((todo) => todo.id !== eId);
  localStorage.setItem("TODOS", JSON.stringify(todoList));
  todoShow.render(todoList);
  todoCount.showCount(todoList);
}

function onToggle(eId) {
  todoList = todoList.map((todo) => {
    if (todo.id === eId) {
      return { ...todo, isCompleted: !todo.isCompleted };
    }
    return todo;
  });

  localStorage.setItem("TODOS", JSON.stringify(todoList));
  todoShow.render(todoList);
}

function handleFiltering(condition) {
  if (condition.startsWith("completed")) {
    const completedTodos = todoList.filter((todo) => todo.isCompleted);
    todoShow.render(completedTodos);
  } else if (condition.startsWith("active")) {
    const activeTodos = todoList.filter((todo) => !todo.isCompleted);
    todoShow.render(activeTodos);
  } else {
    todoShow.render(todoList);
  }
}

function handleEditing(eId, value) {
  todoList = todoList.map((todo) => {
    if (todo.id === eId) {
      return { ...todo, content: value };
    }
    return todo;
  });
  localStorage.setItem("TODOS", JSON.stringify(todoList));
  todoShow.render(todoList);
}

function handleRender() {
  todoShow.render(todoList);
}
