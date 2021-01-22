import TodoApp from "./TodoApp.js";
import { generateId } from "./utils.js";

const appEl = document.querySelector(".todoapp");
const todos = [
  { id: generateId(), value: "테스트용 데이터 1", completed: true },
  { id: generateId(), value: "테스트용 데이터 2", completed: false },
  { id: generateId(), value: "테스트용 데이터 3", completed: true },
];

new TodoApp(appEl, todos).render();
