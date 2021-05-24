class TodoItemModel {
	constructor(contents, id) {
		this._contents = contents;
		this._id = id;
		this._completed = false;
		this._editing = false;
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

	get completed() {
		return this._completed;
	}

	set completed(completed) {
		this._completed = completed;
	}

	get editing() {
		return this._editing;
	}

	set editing(editing) {
		this._editing = editing;
	}
}

export default TodoItemModel;
