import Compoent from "../core/Component.js";

export default class TodoList extends Compoent {
	template() {
		const filterType = this.$props.state.filterType.filterType;

		if(filterType !== undefined && filterType !== 0 && filterType !== "all") {
			return this.filteredTodoItem(filterType);
		};

		return `
		<main>
		<input class="toggle-all" type="checkbox" />
		<ul id="todo-list" class="todo-list">
			${Object.values(this.$props.state.todos).map(({id, text, active}) => `
				<li data-id="${id}" ${active ? "class='completed'" : ""}>
					<div class="view">
						<input class="toggle" type="checkbox" ${active ? "checked=true" : ""}>
						<label class="label">${text}</label>
						<button class="destroy"></button>
					</div>
					<input type="text" class="edit">
				</li>`
			).join("")}
		</ul>
		`;
	};

	filteredTodoItem(type) {
		return `
			<main>
			<input class="toggle-all" type="checkbox" />
			<ul id="todo-list" class="todo-list">
				${Object.values(this.$props.state.todos).map(({id, text, active}) => {
					if(type === "active" && active === false) {return `
						<li data-id="${id}">
							<div class="view">
								<input class="toggle" type="checkbox">
								<label class="label">${text}</label>
								<button class="destroy"></button>
							</div>
							<input type="text" class="edit">
						</li>`
					};
					if(type === "completed" && active === true) {return `
						<li data-id="${id}" class="completed">
							<div class="view">
								<input class="toggle" type="checkbox" checked=true>
								<label class="label">${text}</label>
								<button class="destroy"></button>
							</div>
							<input type="text" class="edit">
						</li>`
					};}
				).join("")}
			</ul>
		`;
	};
};