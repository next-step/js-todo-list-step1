class TodoItemModel {
	constructor(contents, id) {
		this._contents = contents;
		this._id = id;
	}

	get contents() {
		return this._contents;
	}

	set contents(contents) {
		this._contents = contents;
	}

	get id() {
		return this._id;
	}
}

export default TodoItemModel;
