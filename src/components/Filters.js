import { setFilter } from '../store.js';

const Filters = ($target) => {

    const filterItem = ({ target }) => {
        const { classList } = target;

        if (classList.contains('selected')) return;

        $target.querySelector('.selected').classList.remove('selected');
        const filterType = classList[0];
        setFilter(filterType);
        classList.add('selected');
    };

    $target.addEventListener('click', filterItem);
};


export default Filters;