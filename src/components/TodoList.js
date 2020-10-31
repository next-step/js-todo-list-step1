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

	setEvent() {
		const { toggleEvent, deleteEvent } = this.$props;

		this.addEvent("chagne", ".toggle", () => {
			console.log("asdf")
		});
		this.addEvent("click", ".destroy", ({ target }) => {
			deleteEvent(target.closest("[data-id]").dataset.id);
		});
		this.addEvent("dblclick", ".label", ({ target }) => {
			// target.closest("[data-id]").dataset.id

			// li에 editing클래스 추가하기
		});
	};
};