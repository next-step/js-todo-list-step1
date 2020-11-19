export const todoListDOM = (todo) => {
    return `
    <li id=${todo.id} class=${todo.isCompleted ? 'completed' : ''}>
      <div class="view">
        <input class="toggle" type="checkbox" 
        ${todo.isCompleted ? 'checked' : ''} 
        />
        <label class="label">${todo.title}</label>
        <button class="destroy"></button>
      </div>
    </li>`;
}