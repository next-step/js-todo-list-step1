import Component from "../core/Component.js";

export default class TodoInput extends Component {
	template() {
		return `
		<input class="toggle-all" type="checkbox" />
        <ul id="todo-list" class="todo-list"></ul>
        <div class="count-container">
          <span class="todo-count">총 <strong>0</strong> 개</span>
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
		`
	};

	setEvent() {
		const { addItem } = this.$props;

		console.log(this.$target);

		this.addEvent("keyup", "#new-todo-title", ({key, target}) => {
			if(key !== "Enter") return;
			if(key === "Enter") {
				addItem(target.value);

				return;
			};
		});
	};
};