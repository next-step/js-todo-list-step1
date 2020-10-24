const addBubblingEvent = function(eventName, eventTarget, callback) {
	document.body.addEventListener(eventName, e => {
		if(e.target === eventTarget)
			callback(e);
	});
};
let count = 0;

function TodoApp() {
	const todoItems = {
		nomal: [],
		active: [],
		completed: []
	};

	this.state = "nomal";

	new TodoInput({
		addTodo: text => {
			const newTodoItem = new TodoItem(text);
			todoItems[this.state].push(newTodoItem);
			TodoList().render(newTodoItem);
		}
	});
};

function TodoInput({addTodo}) {
	const input = document.querySelector("#new-todo-title");

	addBubblingEvent("keydown", input, event => {
		if(event.key === "Enter") {
			if(event.target.value === "") return false;

			addTodo(event.target.value);
			event.target.value = "";

		};
	});
};

function TodoItem(text) {
	this.text = text;
	this.state = "";

	return initTodoItem(text, this.state);
};

function TodoList() {
	const _list = document.querySelector("#todo-list");
	const countBox = document.querySelector(".todo-count");

	this.render = (todo) => {
		count++;
		countBox.children[0].innerHTML = count;
		_list.append(todo);
	};
	
	this.renderAsState = arr => {
		arr.forEach(item => {
			_list.insertAdjacentHTML("beforeend", item);
		});
	};

	return this;
};

function initTodoItem(text, state) {
	const box = document.createElement("li");
	const view = document.createElement("div");
	const checkBox = document.createElement("input");
	const label = document.createElement("label");
	const destoryButton = document.createElement("button");
	const editInput = document.createElement("input");

	label.innerHTML = text;

	setAttr({
		target: [view, checkBox, label, destoryButton, editInput],
		kind: "class",
		value: ["view", "toggle", "label", "destroy", "edit"]
	});

	setAttr({target: checkBox, kind: "type", value: "checkBox"});

	view.append(checkBox, label, destoryButton);
	box.append(view, editInput);

	return box;
};

function setAttr({target, kind, value}) {
	if(target.length === undefined) target.setAttribute(kind, value);

	objectForEach(target, (item, index) => {
		item.setAttribute(kind, value[index]);
	});
};

function setEvent(target) {
	box.addEventListener("dblclick", function(e) {
		this.classList.toggle("editing");

		editInput.select();
	});
	checkBox.addEventListener("change", function(e) {
		box.classList.toggle("completed");
	});
	destoryButton.addEventListener("click", function(e) {
		list.removeChild(this.parentNode.parentNode);

		allTodoItems.indexOf(this.parentNode.parentNode);

		let idx = allTodoItems.indexOf(this.parentNode.parentNode);
		allTodoItems.splice(idx, 1);

		count--;
		loadTodoItemCount();
	});
	editInput.addEventListener("keyup", function(e) {
		if(e.key === "Enter") label.innerHTML = this.value;
		if(e.key === "Enter" || e.key === "Escape") {
			this.value = "";

			box.classList.remove("editing");
		};
	});
	editInput.addEventListener("focusout", function(e) {
		this.value = "";

		box.classList.remove("editing");
	});
};

function objectForEach(target, callback) {
	for(let i = 0; i < target.length; i++) {
		callback(target[i], i);
	}
};