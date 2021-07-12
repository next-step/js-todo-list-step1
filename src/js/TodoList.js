function todoItemTemplate(item) {
  return `
  <li data-id="${item.id}" class="${item.complete ? 'completed' : ''}">
    <div class="view">
      <input class="toggle" type="checkbox" ${item.complete ? 'checked' : ''} />
      <label class="label" >${item.contents}</label>
      <button class="destroy" ></button>
    </div>
    <input class="edit" value="${item.contents}" />
  </li>
`;
}

function TodoList({ toggle, destroy, edit, update }) {
  this.$todoList = document.getElementById('todo-list');

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join('');
  };

  this.$todoList.addEventListener('click', toggle);
  this.$todoList.addEventListener('click', destroy);
  this.$todoList.addEventListener('dblclick', edit);
  this.$todoList.addEventListener('keydown', update);
}

export default TodoList;
