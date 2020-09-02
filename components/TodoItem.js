class TodoItem {
  constructor($ul, todo) {
    this.$ul = $ul;
    this.todo = todo;
    this.render();
  }

  createTodoTemplete = ({ text }) => `
		<div class="view">
			<input class="toggle" type="checkbox"/>
			<label class="label">${text}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="${text}" />
	`;

  render() {
    const $li = document.createElement('li');
    $li.innerHTML = this.createTodoTemplete(this.todo);
    this.$ul.appendChild($li);
  }
}

export default TodoItem;
