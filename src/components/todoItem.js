const todoItem = (content) => {
  return `
    <li>
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${content}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${content}" />
    </li>
    `;
};

export default todoItem;
