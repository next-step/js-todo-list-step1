class TodoItem {
  constructor($ul, todo) {
    this.$ul = $ul;
    this.todo = todo;
    this.render();
  }

  createTodoTemplete = (todo) => `
		<div class="view">
			<input class="toggle" type="checkbox"/>
			<label class="label">${todo}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="${todo}" />
	`;

  render() {
    const $li = document.createElement('li');
    $li.innerHTML = this.createTodoTemplete(this.todo);
    this.$ul.appendChild($li);
  }
}

export default TodoItem;
