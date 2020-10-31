// const addBubblingEvent = function(eventName, eventTarget, callback) {
// 	document.body.addEventListener(eventName, function(e) {
// 		if(e.target === eventTarget)
// 			callback(e);
// 	});
// };

// function TodoApp() {
// 	const todoItems = {
// 		active: [],
// 		completed: []
// 	};

// 	const list = document.querySelector("#todo-list");
// 	const countBox = document.querySelector(".todo-count");

// 	this.render = TodoList().render;
// 	this.renderAsState = state => TodoList().renderAsState(state, todoItems);

// 	this.refresh = function() {
// 		todoItems[this.originalState].forEach((item, index) => {
// 			if(item.dom == this.dom) todoItems[this.originalState].splice(index, 1);
// 		});

// 		todoItems[this.dom.changedState].push(this);

// 		this.originalState = this.dom.changedState;
// 		this.changedState = "";
// 	};
// 	this.remove = function() {
// 		todoItems[this.originalState].forEach((item, index) => {
// 			if(this == item) todoItems[this.originalState].splice(index, 1);
// 		});

// 		list.removeChild(this.dom);

// 		managementCountBox("minus");
// 	};

// 	objectForEach(localStorage, (item, index) => {
// 		if(typeof item === "string") {
// 			const localStorageIndex = Object.keys(localStorage)[index];

// 			const newTodoItem = new TodoItem(JSON.parse(item).text, this.refresh, this.remove, localStorageIndex, JSON.parse(item).state);
// 			todoItems[JSON.parse(item).state].push(newTodoItem);

// 			this.render(newTodoItem);
// 		};
// 	});

// 	new TodoInput({
// 		addTodo: text => {
// 			const index = "todo" + countBox.children[0].innerHTML;
// 			localStorage.setItem(index, JSON.stringify({text: text, state: "active"}));

// 			const newTodoItem = new TodoItem(text, this.refresh, this.remove, index);
// 			todoItems["active"].push(newTodoItem);

// 			this.render(newTodoItem);
// 		}
// 	});
// };

// function TodoItem(text, refresh, remove, index, state) {
// 	if(state) this.originalState = state;
// 	this.changedState = "";

// 	this.setState = function(state) {
// 		this.changedState = state;
// 	};

// 	this.refresh = refresh;
// 	this.remove = remove;

// 	this.index = index;

// 	this.dom = initTodoItem(text, this);
// 	this.dom.__proto__ = this;

// 	return this;
// };
// TodoItem.prototype = Object.create(HTMLLIElement.prototype)

// function TodoList() {
// 	const list = document.querySelector("#todo-list");

// 	this.render = todo => {
// 		managementCountBox("plus");

// 		list.append(todo.dom);
// 	};

// 	this.renderAsState = (state, arr) => {
// 		list.innerHTML = "";

// 		if(state === "all") {
// 			objectForEach(arr, kind => {
// 				kind.forEach(todo => {
// 					list.append(todo.dom);
// 				});
// 			});
// 			managementCountBox();

// 			return;
// 		};

// 		arr[state].forEach(todo => {
// 			list.append(todo.dom);
// 		});

// 		managementCountBox();
// 	};

// 	return this;
// };

// function initTodoItem(text, item) {
// 	let check = null;

// 	if(item.originalState === "active") check = false;
// 	if(item.originalState === "completed") check = true;

// 	const box = makeDomElement({name: "li", kind: ["class", item.originalState]});
// 	const view = makeDomElement({name: "div", kind: ["class", "view"]});
// 	const checkBox = makeDomElement({name: "input", kind: ["class", "toggle"], type: "checkbox", "checked" : check});
// 	const label = makeDomElement({name: "label", kind: ["class", "label"]});
// 	const destroyButton = makeDomElement({name: "button", kind: ["class", "destroy"], type: "button"});
// 	const editInput = makeDomElement({name: "input", kind: ["class", "edit"]});

// 	label.innerHTML = text;

// 	setTodoEvent(box, label, checkBox, destroyButton, editInput, item);

// 	view.append(checkBox, label, destroyButton);
// 	box.append(view, editInput);

// 	return box;
// };

// function makeDomElement({name, kind, type, checked}) {
// 	const dom = document.createElement(name);

// 	if(kind) dom.setAttribute(kind[0], kind[1]);
// 	if(type) dom.setAttribute("type", type);
// 	if(checked) dom.setAttribute("checked", checked);

// 	return dom;
// };

// function setTodoEvent(box, label, checkBox, destroyButton, editInput, todo) {
// 	addBubblingEvent("dblclick", label, function(e) {
// 		box.classList.add("editing");

// 		editInput.select();
// 		editInput.value = label.innerHTML;
// 	});
// 	addBubblingEvent("change", checkBox, function(e) {
// 		const text = label.innerHTML;
// 		const name = findLocalStorageItem(text);

// 		if(checkBox.checked) {
// 			localStorage.setItem(name, JSON.stringify({text: text, state: "completed"}));

// 			box.setState("completed");
// 		};
// 		if(!checkBox.checked) {
// 			localStorage.setItem(name, JSON.stringify({text: text, state: "active"}));

// 			box.setState("active");
// 		};

// 		todo.refresh();

// 		box.classList.toggle("completed");
// 	});
// 	addBubblingEvent("click", destroyButton, function(e) {
// 		const text = label.innerHTML;
// 		const name = findLocalStorageItem(text);

// 		localStorage.removeItem(name);

// 		todo.remove();
// 	});
// 	addBubblingEvent("keyup", editInput, function(e) {
// 		if(e.key === "Enter") label.innerHTML = e.target.value;
// 		if(e.key === "Enter" || e.key === "Escape") {
// 			e.target.value = "";

// 			box.classList.remove("editing");
// 		};
// 	});
// 	addBubblingEvent("focusout", editInput, function(e) {
// 		e.target.value = "";

// 		box.classList.remove("editing");
// 	});
// };

// function managementCountBox(operator, kind) {
// 	const list = document.querySelector("#todo-list");
// 	const countBox = document.querySelector(".todo-count");
// 	let count = countBox.children[0].innerHTML;

// 	if(operator === "plus") count++;
// 	if(operator === "minus") count--;
// 	if(!operator) count = list.children.length;

// 	countBox.children[0].innerHTML = count;
// };

// function objectForEach(object, callback) {
// 	let index = 0;

// 	for(let key in object) {
// 		callback(object[key], index);
// 		index++;
// 	}
// };

// function findLocalStorageItem(text) {
// 	let name = "";

// 	Object.keys(localStorage).forEach((item, index) => {
// 		if(JSON.parse(localStorage.getItem(item)).text == text) {
// 			name = Object.keys(localStorage)[index];

// 			return;
// 		};
// 	});

// 	return name;
// };


// 위의 주석처리된 코드는 이전에 사용하던 코드입니다.









import Component from "./core/Component.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCounter from "./components/TodoCounter.js";

export default class App extends Component {
	init() {
		this.$state = {
			todos: {
				"1": { id: 1, text: '아이템1', active: false },
				"2": { id: 2, text: '아이템2', active: true }
			},
			filterType: 0,
		};
	};

	template() {
		return `
		<h1>TODOS</h1>
		`;
	};

	addItem(text) {
		const id = Math.max(0, ...Object.keys(this.$state.todos)) + 1;
		const active = false;

		this.setState({
			todos: {
				...this.$state.todos,
				[id] : { id, text, active }
			}
		});
	};

	toggleEvent() {
		this.setState({
			todos: {
				...this.$state.todos,
				[id] : { ...todos[id], active: !todos[id].active }
			}
		});
	};

	deleteEvent(id) {
		const todos = { ...this.$state.todos };

		console.log(todos);

		delete todos[id];

		this.setState({ todos });
	};

	filterItem(filterType) {
		this.setState({ filterType });
	};

	mounted() {
		const { addItem, template, render } = this;
		const $todoapp = document.querySelector(".todoapp");
		const $main = document.querySelector("main");
		const $todoCountBox = document.querySelector(".count-container");

		const input = new TodoInput($todoapp, {
			addItem: addItem.bind(this),
			template: template.bind(this),
			render: render.bind(this)
		});

		const list = new TodoList($main, {
			state: this.$state,
			countBox: $todoCountBox,
			render: render.bind(this)
		});

		const countBox = new TodoCounter($todoCountBox, {
			todoCount: Math.max(0, ...Object.keys(this.$state.todos))
		});

		this.input = input;
		this.list = list;
		this.countBox = countBox;
	};

	render() {
		this.mounted();

		const { input, list, countBox } = this;

		this.$target.innerHTML = this.template();
		this.$target.innerHTML += input.template();
		this.$target.innerHTML += (list.template() + countBox.template());
	};
};