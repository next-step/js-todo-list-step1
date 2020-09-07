const todoItem = ({id, context, complete}) => {
    return `
    <li id="item-${id}" class="${(complete) ? ' completed' : ''}">
        <input type="text" class="edit" value="${context}">
        <input type="checkbox" id="toggle-${id}" class="toggle" value="${complete}" ${(complete) ? 'checked' : ''}>
        <label for="toggle-${id}" class="">${context}</label>
        <button class="destroy"></button>
    </li>
    `
}

export default todoItem;