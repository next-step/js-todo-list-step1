import Compoent from "../core/Component.js";

export default class TodoList extends Compoent {
	template() {
		return `
		<main>
		<input class="toggle-all" type="checkbox" />
		<ul id="todo-list" class="todo-list">
			${this.getStateValue(this.$props.state.todos).map(({id, text, active}) => `
				<li data-id="${id}">
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
};