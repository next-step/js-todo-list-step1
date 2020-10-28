import Compoent from "../core/Compoent.js";

export default class TodoList extends Compoent {
	template() {
		return `
		${this.$props.getFilteredItem().map(({ name, text, active }) => `
			<li data-name="${name}">
			<div class="view">
			<input class="toggle" type="checkbox" checked=${active}>
			<label class="label">${text}</label>
			<button class="destroy">삭제</button>
			</div>
			<input type="text" class="edit">
			</li>
			`).join('')}
		`;
	};

	setEvent() {
		const { toggleEvent, deleteEvent } = this.$props;

		this.addEvent("click", ".destroy", ({ target }) => {
			deleteEvent(target.closest("[data-name]").dataset.name);
		});
		this.addEvent("dblclick", ".label", ({ target }) => {
			// target.closest("[data-name]").dataset.name

			// li에 editing클래스 추가하기
		});
	};
};
// ${ active ? '활성' : '비활성' }