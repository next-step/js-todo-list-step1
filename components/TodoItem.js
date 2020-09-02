class TodoItem {
  constructor($ul, { id, text, isActive }) {
    this.$ul = $ul;
    this.id = id;
    this.text = text;
    this.isActive = isActive;
    this.render();
  }

  createTodoTemplete = (text, isActive) => `
		<div class="view">
			<input class="toggle" type="checkbox" ${!isActive && 'checked'}/>
			<label class="label">${text}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="${text}" />
	`;

  render() {
    const $li = document.createElement('li');
    $li.setAttribute('data-key', this.id);
    $li.innerHTML = this.createTodoTemplete(this.text, this.isActive);
    if (!this.isActive) $li.classList.add('completed');
    this.$ul.appendChild($li);
  }
}

export default TodoItem;
