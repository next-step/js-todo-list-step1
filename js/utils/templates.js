export const TODOLIST = (data) => {
  const result = data
    .map((todo) => {
      return `
          <li ${todo.isCompleted ? "class=completed" : ""} data-id=${todo.id}>
            <div class="view">
              <input class="toggle" type="checkbox" 
              ${todo.isCompleted ? "checked" : ""} 
              />
              <label class="label">${todo.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" placeholder="${todo.text}" value="" />
          </li>
        `;
    })
    .join("");
    return result
};

export const TODOCOUNT = (count) => `총 <strong>${count}</strong> 개`