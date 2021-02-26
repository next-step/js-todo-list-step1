import TodoApp from "./components/TodoApp.js";

const storedItems = JSON.parse(localStorage.getItem("items"));

// TodoApp 생성

console.log(storedItems);
new TodoApp(storedItems);
