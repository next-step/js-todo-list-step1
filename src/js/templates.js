export const todoItemTemplate = ({ todo = '', completed = false }) => {
  if (todo === '') return null;
  return `
    <li ${completed && `class="completed"`}>
      <div class="view">
        <input class="toggle" type="checkbox" ${completed && `checked`} />
        <label class="label">${todo}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo}" />
    </li>
  `;
};
