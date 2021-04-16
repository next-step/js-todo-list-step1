function TodoList({ onCheck }) {
  const $todoList = document.querySelector('.todo-list');

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    $todoList.innerHTML = template.join('');
  };

  $todoList.addEventListener('click', (event) => this.checkTodoList(event));

  this.checkTodoList = (event) => {
    if (event.target.classList[0] === 'toggle') {
      onCheck(event.target.getAttribute('id'));
    }
  };

  const todoItemTemplate = (item) => {
    return `
  <li id=${item.id} class=${item.completed ? 'completed' : 'false'}>
    <div class="view">
        <input class="toggle" type="checkbox" id=${item.id} ${
      item.completed ? 'checked' : false
    }>
        <label class="label">${item.contents}</label>
        <button class="destroy" id=${item.id}></button>
    </div>
    <input class="edit" value=${item.contents}>
  </li>
  `;
  };
}

export default TodoList;
