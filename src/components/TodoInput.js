import Component from "../core/Component.js";

export default class TodoInput extends Component {
	template() {
		return `
		<input
		id="new-todo-title"
		class="new-todo"
		placeholder="할일을 추가해주세요"
		autofocus />
		`;
	};

	setEvent() {
		const { addItem } = this.$props;

		this.addEvent("keyup", "#new-todo-title", ({key, target}) => {
			if(key !== "Enter") return;
			if(key === "Enter") {
				addItem(target.value);

				return;
			};
		});
	};
};