import Component from "../core/Component.js";

export default class TodoContainer extends Component{

    template(){
        const {itemCount} = this.$props;
        return `
        <span class="todo-count">총 <strong>${itemCount}</strong> 개</span>
        <ul class="filters">
            <li>
            <a class="filter" data-filter="0" href="#">전체보기</a>
            </li>
            <li>
            <a class="filter" href="#active" data-filter="2">해야할 일</a>
            </li>
            <li>
            <a class="filter" href="#completed" data-filter="1">완료한 일</a>
            </li>
        </ul>`
    }

    setEvent() {
        const { filterItem } = this.$props;
        this.addEvent("click", ".filter", (event) => {
           
            filterItem(Number(event.target.dataset.filter));
        });
    }
}   