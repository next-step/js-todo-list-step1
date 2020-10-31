import Component from "../core/Component.js";

export default class TodoCount extends Component {
	template() {
		return `
		<div class="count-container">
			<span class="todo-count">총 <strong>${this.$props.todoCount}</strong> 개</span>
			<ul class="filters">
				<li>
					<a class="all selected" href="#">전체보기</a>
				</li>
				<li>
					<a class="active" href="#active">해야할 일</a>
				</li>
				<li>
					<a class="completed" href="#completed">완료한 일</a>
				</li>
			</ul>
		</div>
		</main>
		`;
	};
};