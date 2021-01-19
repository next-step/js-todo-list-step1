const todoTemplate = ({ id, text, completed, editing }) => {
  const classList = [completed ? "completed" : "", editing ? "editing" : ""]
    .join(" ")
    .trim();

  return `
    <li
      class="${classList}"
      data-id=${id}
    >
      <div class="view">
        <input class="toggle" type="checkbox" ${completed ? "checked" : ""}/>
        <label class="label">${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}" />
    </li>
  `;
};

export { todoTemplate };
