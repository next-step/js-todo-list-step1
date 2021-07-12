// todoList 보여주는 컴포넌트
export default function TodoList({ onComplete, onDelete, onEditing, onEdit }) {
  this.todoList = document.querySelector('#todo-list');

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.todoList.addEventListener('click', (event) => {
    const li = event.target.parentNode.parentNode;
    const id = parseInt(li.dataset.id);
    if (event.target.className === 'toggle') {
      onComplete(id);
    }
    if (event.target.className === 'destroy') {
      onDelete(id);
    }
  });

  this.todoList.addEventListener('dblclick', (event) => {
    const li = event.target.parentNode.parentNode;
    const id = parseInt(li.dataset.id);
    onEditing(id);
  });

  this.todoList.addEventListener('keydown', (event) => {
    const li = event.target.parentNode;
    const id = parseInt(li.dataset.id);
    onEdit(event, id);
  });

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
    this.todoList.innerHTML = template.join('');
  };
}
