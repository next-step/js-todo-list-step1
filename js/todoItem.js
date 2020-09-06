const todoItem = ({id, context, complete}) => {
    return `
    <li>
        <input type="text" class="edit" value="${context}">
        <input type="checkbox" class="toggle" value="${complete}">
        <label for="toggle" class="">${context}</label>
        <button class="destroy"></button>
    </li>
    `
}

export default todoItem;