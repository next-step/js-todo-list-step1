const addBubblingEvent = function(eventName, eventTarget, callback) {
	document.body.addEventListener(eventName, e => {
		if(e.target === eventTarget)
			callback(e);
	});
};
let count = 0;

function TodoApp() {
	this.todoItems = {
		nomal: [new TodoItem("test")],
		active: [],
		completed: []
	};

	this.state = "nomal";

	new TodoInput({
		addTodo: text => {
			const newTodoItem = new TodoItem(text);
			this.todoItems[this.state].push(newTodoItem);
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

	this.setState = function(state) {
		this.state = state;
	};

	this.dom = initTodoItem(this.text, this);

	return this;
};

function TodoList() {
	const _list = document.querySelector("#todo-list");
	const countBox = document.querySelector(".todo-count");

	this.render = (todo) => {
		count++;
		countBox.children[0].innerHTML = count;
		_list.append(todo.dom);
	};
	
	this.renderAsState = arr => {
		arr.forEach(item => {
			_list.insertAdjacentHTML("beforeend", item);
		});
	};

	return this;
};

function initTodoItem(text, item) {
	const box = makeDomElement({name: "li"});
	const view = makeDomElement({name: "div", kind: ["class", "veiw"]});
	const checkBox = makeDomElement({name: "input", kind: ["class", "toggle"], type: "checkbox"});
	const label = makeDomElement({name: "label", kind: ["class", "label"]});
	const destoryButton = makeDomElement({name: "button", kind: ["class", "destroy"], type: "button"});
	const editInput = makeDomElement({name: "input", kind: ["class", "edit"]});

	label.innerHTML = text;

	// setAttr({
	// 	target: [view, checkBox, label, editInput],
	// 	kind: "class",
	// 	value: ["view", "toggle", "label", "edit"]
	// });

	// setAttr({target: checkBox, kind: "type", value: "checkBox"});

	view.append(checkBox, label, destoryButton);
	box.append(view, editInput);

	return box;
};

function makeDomElement({name, kind, type}) {
	const dom = document.createElement(name);
	if(kind) dom.setAttribute(kind[0], kind[1]);
	if(type) dom.setAttribute("type", type);

	return dom;
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