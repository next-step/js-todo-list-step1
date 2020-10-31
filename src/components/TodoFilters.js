import Component from "../core/Component.js"; 

export default class TodoFilters extends Component {
	template() {

		return `
		<ul class="filters">
				<li>
					<a class="all ${this.$props.type === "all" ? "selected" : ""}" href="#">전체보기</a>
				</li>
				<li>
					<a class="active ${this.$props.type === "active" ? "selected" : ""}" href="#active">해야할 일</a>
				</li>
				<li>
					<a class="completed ${this.$props.type === "completed" ? "selected" : ""}" href="#completed">완료한 일</a>
				</li>
			</ul>
		</div>
		</main>
		`;
	};
};