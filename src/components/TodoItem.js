export default function TodoItem(todo) {
    return `
        <li data-id="${todo.id}" class=${todo.editing ? 'editing' : ''} ${todo.complete ? 'completed' : ''}>
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