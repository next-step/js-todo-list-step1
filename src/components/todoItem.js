const todoItem = (content, index, completed) => {
  return `
    <li class=${completed && 'completed'} data-index=${index}>
        <div class="view">
            <input class="toggle" type="checkbox" ${completed && 'checked'}/>
            <label class="label">${content}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${content}" />
    </li>
    `;
};

export default todoItem;
