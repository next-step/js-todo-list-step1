class TodoInput {
	$todoInput = document.querySelector('#new-todo-title');
	constructor(addTodos) {
		this.$todoInput.addEventListener('keyup', e => this.onSubmit(e, addTodos));
	}

	onSubmit = (e, addTodos) => {
		if (e.key === 'Enter') {
			addTodos(e.target.value);
			this.$todoInput.value = '';
		}
	}
}

export default TodoInput;
