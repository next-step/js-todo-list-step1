export default function TodoItem(todo) {
    return `
        <li data-id="${todo.id}" ${todo.editing ? 'editing' : ''}>
                <input type="checkbox" 
                        ${todo.complete ? 'checked' : ''}
                        data-action="toggle"/>
                ${
                    todo.editing ? `<input type="text" value=${todo.content} />` : todo.content
                 }
                <span class="delete-btn" data-action="delete">X</span>
            </li>
    `
}