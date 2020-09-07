import { setFilter } from '../store.js';
import { filterTypes } from '../globalVariables.js';
import { getFilter } from '../store.js';

const Filters = ($target) => {

    const filterItem = (event) => {
        event.preventDefault();
        const { target: { dataset } } = event;

        if (getFilter() === dataset) return;
        setFilter(dataset.type);
    };

    $target.addEventListener('click', filterItem);


    return (filter) => filterTypes.map(({ type, text }) => `
    <li>
        <a class="${ type } ${ filter === type && 'selected' }" href="#" data-type="${ type }">${ text }</a>
    </li>
    `).join('');
};


export default Filters;