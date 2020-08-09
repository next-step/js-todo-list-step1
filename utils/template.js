export const todoCountTemplate = (count) => `총 <strong>${count}</strong> 개`;

export const todoItemHTMLTemplate = ({ id, text, isCompleted }, index) => {
  return `
    <li data-id=${id} data-index=${index} class=${
    isCompleted ? "completed" : ""
  }>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            isCompleted ? "checked" : ""
          }/>
          <label class="label">${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${text} />
    </li>`;
};
