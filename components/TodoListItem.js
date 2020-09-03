class TodoListItem {
  constructor(parentElement, todoItem) {
    this.todoItem = todoItem;
    this.$parentElement = parentElement;
    console.log(this.todoItem);
    this.render();
  }

  createTodoItemTemplate = (text) => `
		<div class="view">
			<input class="toggle" type="checkbox"/>
			<label class="label">${text} </label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="${text}" />
	`;

  render() {
    const $li = document.createElement('li');
    $li.innerHTML = this.createTodoItemTemplate(this.todoItem);
    this.$parentElement.appendChild($li);
  }
}

export default TodoListItem;
