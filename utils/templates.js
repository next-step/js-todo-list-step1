export const todoListTemplate = (todos) => {
  return todos
    .map((todo, index) => {
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

      return `<li ${completedClassName} data-id="${index}">${contentHtmlString}</li>`;
    })
    .join("");
};
