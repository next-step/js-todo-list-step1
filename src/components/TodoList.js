// todoList 보여주는 컴포넌트
export default function TodoList() {
  const todoList = document.querySelector('#todo-list');

  todoList.addEventListener('click', (event) => this.handleClick(event));
  todoList.addEventListener('dblclick', (event) => this.handleDblClick(event));
  todoList.addEventListener('keydown', (event) => this.handleKeydown(event));

  this.setEventListener = (onComplete, onDelete, onEdit, onUpdate) => {
    this.onComplete = onComplete;
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.onUpdate = onUpdate;
  };

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    const template = items.map((item) => {
      return `
      <li class="${item.completed ? 'completed' : ''} ${
        item.editing ? 'editing' : ''
      }" data-id="${item.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${
            item.completed ? 'checked' : ''
          }/>
          <label class="label">${item.contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.contents}" />
      </li>
      `;
    });
    todoList.innerHTML = template.join('');
  };

  this.handleKeydown = (event) => {
    const id = parseInt(event.target.parentNode.dataset.id);
    this.onUpdate && this.onUpdate(event, id);
  };

  this.handleDblClick = (event) => {
    const id = parseInt(event.target.parentNode.parentNode.dataset.id);
    this.onEdit && this.onEdit(id);
  };

  this.handleClick = (event) => {
    const id = parseInt(event.target.parentNode.parentNode.dataset.id);
    if (event.target.className === 'toggle') {
      this.onComplete && this.onComplete(id);
    }
    if (event.target.className === 'destroy') {
      this.onDelete && this.onDelete(id);
    }
  };
}
