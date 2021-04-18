export const todoItemTemplate = item => (
  `
    <li data-index=${item.id} class=${item.done ? 'completed' : ''}>
      <div class="view">
        <input type="checkbox" class="toggle" id="item${item.id}" ${item.done ? 'checked' : ''} />
        <label for="item${item.id}">${item.text}</label>
        <button class="destroy"></button>
      </div>
    </li>
  `
);