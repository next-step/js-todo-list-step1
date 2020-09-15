import { ALL, ACTIVE, COMPLETED } from "../utils/constants.js";

export default function TodoFilter({ todoItems, onFilter }) {
    this.todoItems = todoItems;

    const $todoFilter = document.querySelector("ul.filters");

    const filterTypes = [
        { type: ALL, text: '전체보기' },
        { type: ACTIVE, text: '해야할 일' },
        { type: COMPLETED, text: '완료한 일' },
    ];

    this.setState = items => {
        this.todoItems = items;
        this.render();
    };

    this.bindEvent = () => {
        $todoFilter.addEventListener('click', e => {
            const $filterType = e.target.dataset.filterType;
            switch ($filterType) {
                case ALL:
                    onFilter(ALL);
                    break;
                case ACTIVE:
                    onFilter(ACTIVE);
                    break;
                case COMPLETED:
                    onFilter(COMPLETED);
                    break;
                default:
                    break;
            }
        });
    };

    this.render = () => {
        const filterList = filterTypes.map(filter => {
            return (`
            <li>
              <a class="all ${filter.type}" data-filter-type=${filter.type} >${filter.text}</a>
            </li>
            `)
        }).join("");
        $todoFilter.innerHTML = filterList;
        this.bindEvent();
    };

}