import {Component} from "../core/Component/index.js";
import {store} from "../modules/index.js";
import {changeFilter} from "../modules/todo/reducer.js";

const filters = [
    {title: "전체보기", href: "#", class: "all"},
    {title: "해야할 일", href: "#active", class: "active"},
    {title: "완료한 일", href: "#completed", class: "complete"},
];

function TodoFilterItem(filter, filtered) {
    return `
        <li>
            <a data-filter=${filter.class} class="${filter.class} ${filtered == filter.class ? " selected" : ""}" href=${filter.href} >
                ${filter.title}
            </a>
        </li>
    `
}

export default class TodoFilters extends Component {
    fetchChangeFilter = (filter) => {
        store.dispatch(changeFilter(filter));
    };

    setEvent(target) {
        target.addEventListener('click', ({target}) => {
            const selectedFilter = target.dataset.filter;
            this.fetchChangeFilter(selectedFilter);
        })
    }

    render() {
        const {filtered} = store.getState();

        return filters.map(filter => TodoFilterItem(filter, filtered)).join('')
    }
}