export default class AddTodo {
  constructor($newTodoTitle, loadTodo) {
		this.loadTodo = loadTodo;
		$newTodoTitle.addEventListener('keyup', this.addTodo);
	}

	addTodo = ({target, key}) => {
		if (key === 'Enter' && target.value) {
			
		}
	}
