import Component from "../core/Component.js";

export default class TodoInput extends Component {
	template() {
		return this.$props.template();
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