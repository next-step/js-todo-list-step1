import { filterMap } from "./constants.js";

export const todoListTemplate = (todos) => {
  return todos
    .map((todo) => {
      const contentHtmlString = `
      <div class="view"> 
        <input class="toggle" type="checkbox" ${
          todo.isCompleted ? "checked" : ""
        }>
        <label class="label">${todo.content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.content}">`;

      const completedClassName = todo.isCompleted ? 'class = "completed"' : "";

      return `<li ${completedClassName} data-id="${todo.id}">${contentHtmlString}</li>`;
    })
    .join("");
};

export const todoCountTemplate = (count) => `총 <strong>${count}</strong> 개`;

export const todoFilterTemplate = (filter) => {
  const allSelected = filter === filterMap.ALL ? " selected" : "";
  const activeSelected = filter === filterMap.ACTIVE ? " selected" : "";
  const completedSelected = filter === filterMap.COMPLETED ? " selected" : "";

  return `
    <li>
      <a class="all${allSelected}" href="#/">전체보기</a>
    </li>
    <li>
      <a class="active${activeSelected}" href="#/active">해야할 일</a>
    </li>
    <li>
      <a class="completed${completedSelected}" href="#/completed">완료한 일</a>
    </li>`;
};
