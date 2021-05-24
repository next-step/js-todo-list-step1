export const todoItemTemplate = ({ id, todo = '', completed = false }) => {
  if (todo === '') return null;
  return `
    <li id="${id}" ${completed ? `class="completed"` : ''}>
      <div class="view">
        <input class="toggle" type="checkbox" ${completed ? `checked` : ''} />
        <label class="label">${todo}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo}" />
    </li>
  `;
};

export const todoCountTemplate = (total) => `총 <strong>${total}</strong> 개`;
