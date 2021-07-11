import Component from "../core/Component";

export default class TodoContainer extends Component{
    template() {
        const { countItem } = this.$props;
        return
        `<span class="todo-count">총 <strong>${countItem}</strong> 개</span>
        <ul class="filters">
        <li>
          <a class="all selected filter" data-filter="0" href="#">전체보기</a>
        </li>
        <li>
          <a class="active filter" href="#active" data-filter="1">해야할 일</a>
        </li>
        <li>
          <a class="completed filter" href="#completed" data-filter="2">완료한 일</a>
        </li>
      </ul>`
    }
    setEvent() {
        const { filterItem } = this.$props;
        this.addEvent("click", ".filter", (event) => {
            event.preventDefault();
            filterItem(Number(event.target.dataset.filter));
        })
    }
}   