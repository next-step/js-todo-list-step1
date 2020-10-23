import TodoCount from "./components/todoCount.js";
import TodoInput from "./components/todoInput.js";
import TodoList from "./components/todoList.js";

//count id setting
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

//handling add
function addTodos(item) {
  todoList.push({
    id: Date.now(),
    content: item,
    isCompleted: false,
  });
  todoCount.showCount(todoList);
  todoShow.render(todoList);
}

function onDelete(eId) {
  todoList = todoList.filter((todo) => todo.id !== eId);
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

  todoShow.render(todoList);
}
function handleRender() {
  todoShow.render(todoList);
}
