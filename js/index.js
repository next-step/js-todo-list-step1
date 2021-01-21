import TodoApp from "./TodoApp.js";

const appEl = document.querySelector(".todoapp");
const items = [
  { id: 1, value: "테스트용 데이터 1", done: true },
  { id: 2, value: "테스트용 데이터 2", done: false },
  { id: 3, value: "테스트용 데이터 3", done: true },
];

new TodoApp(appEl, items).render();
