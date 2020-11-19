import Component from "../core/Component.js";

export default class TodoCount extends Component {
	template() {
		return `
		<div class="count-container">
			<span class="todo-count">총 <strong>${this.$props.todoCount()}</strong> 개</span>
		`;
	};
};