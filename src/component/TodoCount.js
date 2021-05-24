function TodoCount({ target }) {
	this.setState = (updatedTodoItems) => {
		this.render(updatedTodoItems);
	};

	this.render = (items) => {
		target.innerHTML = items.length;
	};
}

export default TodoCount;
