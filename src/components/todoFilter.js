import Component from "../core/Component.js";

export default class TodoFilter extends Component {
  template() {
    const { typeOfFilter, filteredList } = this.$props;

    return `
        <span class="todo-count">총 <strong>${
          filteredList.length
        }</strong> 개</span>
        <ul class="filters">
          <li>
            <button class="filterBtn" data-type-of-filter="all" ${
              typeOfFilter === "all" &&
              'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
            }>전체보기</button>
          </li>
          <li>
            <button class="filterBtn" data-type-of-filter="doing" ${
              typeOfFilter === "doing" &&
              'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
            }>해야할 일</button>
          </li>
          <li>
            <button class="filterBtn" data-type-of-filter="completed" ${
              typeOfFilter === "completed" &&
              'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
            }>완료한 일</button>
          </li>
        </ul>
        `;
  }
  setEvent() {
    const { filterList } = this.$props;
    this.addEvent("click", ".filterBtn", ({ target }) => {
      const typeOfFilter = target.dataset.typeOfFilter;
      filterList(typeOfFilter);
    });
  }
}
