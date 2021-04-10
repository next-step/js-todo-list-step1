class TodoItemModel {
	constructor(contents) {
		this._contents = contents;
	}

	get contents() {
		return this._contents;
	}

	set contents(contents) {
		this._contents = contents;
	}
}

export default TodoItemModel;
