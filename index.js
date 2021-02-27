import TodoApp from "./components/TodoApp.js";

const storedItems = JSON.parse(localStorage.getItem("items"));
const storedLayer = localStorage.getItem("layer");

new TodoApp(storedItems, storedLayer);
