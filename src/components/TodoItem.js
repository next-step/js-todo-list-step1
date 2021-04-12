import { generateUuid } from '../utils/Uuid.js';

export const TodoItemStatus = {
  EDITING: 'editing',
  VIEW: 'view',
  COMPLETED: 'completed',
};

export default class TodoItem {
  constructor({ id = generateUuid(), content, isCompleted = false }) {
    this.id = id;
    this.content = content;
    this.isCompleted = isCompleted;
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  equalsId(id) {
    return this.id === id;
  }

  render() {
    return `
      <li class="${this.isCompleted ? TodoItemStatus.COMPLETED : TodoItemStatus.VIEW}" data-id=${this.id}>
        <div class="view">
          <input 
            class="toggle" 
            type="checkbox"  
            ${this.isCompleted ? 'checked' : ''}
          />
          <label class="label">${this.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${this.content}" />
      </li>
    `;
  }
}
