import { ALL, ACTIVE, COMPLETED } from "../utils/constants.js";

export default function TodoFilter({ todoItems, onFilter }) {
    this.todoItems = todoItems;

    const $todoFilter = document.querySelector("ul.filters");

    const filterTypes = [
        { type: ALL, text: '전체보기' },
        { type: ACTIVE, text: '해야할 일' },
        { type: COMPLETED, text: '완료한 일' },
    ];
    let selected = ALL;

    this.setState = items => {
        this.todoItems = items;
        this.render();
    };

    this.bindEvent = () => {
        $todoFilter.addEventListener('click', e => {
            e.preventDefault();
            const $filterType = e.target.dataset.filterType;
            switch ($filterType) {
                case ALL:
                    selected = ALL;
                    onFilter(ALL);
                    break;
                case ACTIVE:
                    selected = ACTIVE;
                    onFilter(ACTIVE);
                    break;
                case COMPLETED:
                    selected = COMPLETED;
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
              <a class="all ${filter.type} ${selected === filter.type ? 'selected': ''}" data-filter-type=${filter.type} >${filter.text}</a>
            </li>
            `)
        }).join("");
        $todoFilter.innerHTML = filterList;
        this.bindEvent();
    };

}