class TodoItem {
	constructor($ul, todo) {
		this.$ul = $ul;
		this.todo = todo;
		this.render();
	}
	render() {
		const $li = document.createElement('li');
		$li.innerText = this.todo;
		this.$ul.appendChild($li);
	}
}

export default TodoItem;
