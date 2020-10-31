import Component from "./core/Component.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCounter from "./components/TodoCounter.js";
import TodoFilters from "./components/TodoFilters.js";

export default class App extends Component {
	init() {
		this.$state = {
			todos: {
				...this.localStorageParser()
			},
			filterType: {filterType: "all"},
		};
	};

	localStorageParser() {
		return Object.keys(localStorage).map(idx => {
			return JSON.parse(localStorage[idx])
		});
	};

	template() {
		return `<h1>TODOS</h1>`;
	};

	setEvent() {
		this.addEvent("change", ".toggle", ({ target }) => {  // 체크박스 클릭
			const parent = target.closest("[data-id]");
			const id = target.closest("[data-id]").dataset.id;

			if(parent.children[0].children[0].checked) parent.classList.add("completed");
			if(!parent.children[0].children[0].checked) parent.classList.remove("completed");

			this.toggleEvent(id);
		});
		this.addEvent("click", ".destroy", ({ target }) => {  // 삭제버튼 클릭
			const id = target.closest("[data-id]").dataset.id;

			this.deleteEvent(id);
		});
		this.addEvent("dblclick", ".label", ({ target }) => { // 레이블 더블 클릭
			const parent = target.closest("[data-id]");

			if(!parent) return;

			const editInput = parent.children[1];

			parent.classList.add("editing");
			editInput.value = parent.children[0].children[1].innerHTML;

			editInput.focus();
		});
		this.addEvent("keyup", ".edit", ({ target, key }) => { // 수정용 인풋에 keyup
			const parent = target.closest("[data-id");
			const id = parent.dataset.id;

			if(key === "Enter") {
				if(!parent) return;

				parent.children[0].children[1].innerHTML = target.value;

				localStorage.setItem(id, JSON.stringify({id: id, text: target.value, active: JSON.parse(localStorage.getItem(id)).active}));

				parent.classList.remove("editing");
			};
			if(key === "Enter" || key === "Escape") {
				target.value = "";

				parent.classList.remove("editing");

				return;
			};
		});
		this.addEvent("focusout", ".edit", ({ target }) => { // 수정용 인풋이 포커스를 잃으경우
			const parent = target.closest("[data-id");

			target.value = "";

			parent.classList.remove("editing");
		});

		this.setFilterEvent(); // 상태 필터에 이벤트 걸기
	};

	addItem(text) {
		const id = Math.max(0, ...Object.keys(localStorage)) + 1;
		const active = false;

		this.setState({
			todos: {
				...this.$state.todos,
				[id] : { id, text, active }
			}
		});

		localStorage.setItem(id, JSON.stringify({id: id, text: text, active: active}));
	};

	toggleEvent(id) {
		localStorage.setItem(id, JSON.stringify({id: id, text: JSON.parse(localStorage.getItem(id)).text, active: !JSON.parse(localStorage.getItem(id)).active}));

		try{
			this.$state.todos[id].active = !this.$state.todos[id].active;
		}catch(err) {

		}

	};

	deleteEvent(id) {
		const todos = { ...this.$state.todos };

		localStorage.removeItem(id);

		delete todos[id];

		this.setState({
			todos: {
				...this.localStorageParser()
			}
		});
		this.render();
	};

	filterItem(filterType) {
		this.setState({ filterType });
	};

	setFilterEvent() {
		const filters = document.querySelector(".filters").children;

		this.objectForEach(filters, filter => {
			if(typeof filter === "object") {
				filter.children[0].classList.remove("selected");

				this.addEvent("click", `.${filter.children[0].classList[0]}`, ({ target }) => {
					target.classList.add("selected");

					const filterType = filter.children[0].classList[0];

					this.filterItem({ filterType });
				});
			};
		});
	};

	stateTodoCount() {
		return this.getStateTodoCount();
	};

	mounted() {
		const { addItem, template, render, toggleEvent, deleteEvent, stateTodoCount, filterItem } = this;
		const $todoapp = document.querySelector(".todoapp");
		const $main = document.querySelector("main");
		const $todoCountBox = document.querySelector(".count-container");

		const input = new TodoInput($todoapp, {
			addItem: addItem.bind(this),
		});

		const list = new TodoList($main, {
			state: this.$state,
			toggleEvent: toggleEvent,
			deleteEvent: deleteEvent,
		});

		const countBox = new TodoCounter($todoCountBox, {
			todoCount: stateTodoCount.bind(this)
		});

		const filters = new TodoFilters($todoCountBox, {
			filterItem: filterItem,
			type: this.$state.filterType.filterType
		});

		this.input = input;
		this.list = list;
		this.countBox = countBox;
		this.filters = filters;
	};

	render() {
		this.mounted();

		const { input, list, countBox, filters } = this;

		this.$target.innerHTML = this.template();
		this.$target.innerHTML += input.template();
		this.$target.innerHTML += (list.template() + countBox.template() + filters.template());
	};
};

// localStorage.clear();