import Component from "./core/Component.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCounter from "./components/TodoCounter.js";

export default class App extends Component {
	init() {
		this.$state = {
			todos: {
			
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
		this.setEvent();

		const { input, list, countBox } = this;

		this.$target.innerHTML = this.template();
		this.$target.innerHTML += input.template();
		this.$target.innerHTML += (list.template() + countBox.template());
	};
};