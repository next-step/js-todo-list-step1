import Compoent from "../core/Component.js";

export default class TodoList extends Compoent {
	template() {
		// return `
		// ${this.$props.getFilteredItem().map(({ id, text, active }) => `
		// 	<li data-id="${id}">
		// 	<div class="view">
		// 	<input class="toggle" type="checkbox" checked=${active}>
		// 	<label class="label">${text}</label>
		// 	<button class="destroy">삭제</button>
		// 	</div>
		// 	<input type="text" class="edit">
		// 	</li>
		// 	`).join('')}
		// `;

		return `
		${[...Object.values(this.$state.todos)].map(({id, text, active}) => `
			<li data-id="${id}">
			<div class="view">
			<input class="toggle" type="checkbox" ${active ? "checked=true" : ""}>
			<label class="label">${text}</label>
			<button class="destroy"></button>
			</div>
			<input type="text" class="edit">
			</li>
			`).join("")}
		`;
	};

	setEvent() {
		const { toggleEvent, deleteEvent } = this.$props;

		this.addEvent("click", ".destroy", ({ target }) => {
			deleteEvent(target.closest("[data-id]").dataset.id);
		});
		this.addEvent("dblclick", ".label", ({ target }) => {
			// target.closest("[data-id]").dataset.id

			// li에 editing클래스 추가하기
		});
	};
};
// ${ active ? '활성' : '비활성' }