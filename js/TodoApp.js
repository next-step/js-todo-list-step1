const addBubblingEvent = function(eventName, eventTarget, callback) {
	document.body.addEventListener(eventName, function(e) {
		if(e.target === eventTarget)
			callback(e);
	});
};
let count = 0;

function TodoApp() {
	const todoItems = {
		active: [],
		completed: []
	};
	const _list = document.querySelector("#todo-list");
	const countBox = document.querySelector(".todo-count");

	this.render = TodoList().render;
	this.renderAsState = state => TodoList().renderAsState(state, todoItems);

	this.refresh = function() {
		todoItems[this.originalState].forEach((item, index) => {
			if(item.dom == this.dom) todoItems[this.originalState].splice(index, 1);
		});

		todoItems[this.dom.changedState].push(this);

		this.originalState = this.dom.changedState;
		this.changedState = "";
	};
	this.remove = function() {
		todoItems[this.originalState].forEach((item, index) => {
			if(this == item) todoItems[this.originalState].splice(index, 1);
		});

		_list.removeChild(this.dom);

		count--;
		countBox.children[0].innerHTML = count;
	};

	new TodoInput({
		addTodo: text => {
			const newTodoItem = new TodoItem(text, this.refresh, this.remove);
			todoItems["active"].push(newTodoItem);
			this.render(newTodoItem);
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

function TodoItem(text, refresh, remove) {
	this.originalState = "active";
	this.changedState = "";

	this.setState = function(state) {
		this.changedState = state;
	};

	this.refresh = refresh;
	this.remove = remove;

	this.dom = initTodoItem(text, this);
	this.dom.__proto__ = this;

	return this;
};
TodoItem.prototype = Object.create(HTMLLIElement.prototype)

function TodoList() {
	const _list = document.querySelector("#todo-list");
	const countBox = document.querySelector(".todo-count");

	this.render = todo => {
		count++;
		countBox.children[0].innerHTML = count;
		_list.append(todo.dom);
	};
	
	this.renderAsState = (state, arr) => {
		_list.innerHTML = "";
		console.log(arr);

		if(state === "all") {
			objectForEach(arr, kind => {
				kind.forEach(todo => {
					_list.append(todo.dom);
				});
			});

			return;
		};
		
		arr[state].forEach(todo => {
			_list.append(todo.dom);
		});
	};

	return this;
};

function initTodoItem(text, item) {
	const box = makeDomElement({name: "li"});
	const view = makeDomElement({name: "div", kind: ["class", "view"]});
	const checkBox = makeDomElement({name: "input", kind: ["class", "toggle"], type: "checkbox"});
	const label = makeDomElement({name: "label", kind: ["class", "label"]});
	const destroyButton = makeDomElement({name: "button", kind: ["class", "destroy"], type: "button"});
	const editInput = makeDomElement({name: "input", kind: ["class", "edit"]});

	label.innerHTML = text;

	setTodoEvent(box, label, checkBox, destroyButton, editInput, item);

	view.append(checkBox, label, destroyButton);
	box.append(view, editInput);

	return box;
};

function makeDomElement({name, kind, type}) {
	const dom = document.createElement(name);

	if(kind) dom.setAttribute(kind[0], kind[1]);
	if(type) dom.setAttribute("type", type);

	return dom;
};

function setTodoEvent(box, label, checkBox, destroyButton, editInput, todo) {
	addBubblingEvent("dblclick", label, function(e) {
		box.classList.add("editing");
		
		editInput.select();
	});
	addBubblingEvent("change", checkBox, function(e) {
		if(checkBox.checked) box.setState("completed");
		if(!checkBox.checked) box.setState("active");

		todo.refresh();

		box.classList.toggle("completed");
	});
	addBubblingEvent("click", destroyButton, function(e) {
		todo.remove();
	});
	addBubblingEvent("keyup", editInput, function(e) {
		if(e.key === "Enter") label.innerHTML = e.target.value;
		if(e.key === "Enter" || e.key === "Escape") {
			e.target.value = "";

			box.classList.remove("editing");
		};
	});
	addBubblingEvent("focusout", editInput, function(e) {
		e.target.value = "";

		box.classList.remove("editing");
	});
};

function objectForEach(object, callback) {
	let index = 0;
	for(let key in object) {
		index++;
		callback(object[key], index);
	}
};