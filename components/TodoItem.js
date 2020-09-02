class TodoItem {
  constructor($ul, { id, text }) {
    this.$ul = $ul;
    this.id = id;
    this.text = text;
    this.render();
  }

  createTodoTemplete = (text) => `
		<div class="view">
			<input class="toggle" type="checkbox"/>
			<label class="label">${text}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="${text}" />
	`;

  render() {
    const $li = document.createElement('li');
    $li.innerHTML = this.createTodoTemplete(this.text);
    this.$ul.appendChild($li);
  }
}

export default TodoItem;
