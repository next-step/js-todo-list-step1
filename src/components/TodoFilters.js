import { filterTypes } from '../constant.js';

const TodoFilters = () => {

    return (filter) => filterTypes.map(({ type, text }) => `
        <li>
            <a class="${ type } ${ filter === type && 'selected' }" href="#" data-type="${ type }">${ text }</a>
        </li>
    `).join('');
};


export default TodoFilters;