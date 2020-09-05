import { setFilter } from '../store.js';

const Filters = ($target) => {

    const clickFilter = ({ target }) => {
        const { classList } = target;

        if (classList.contains('selected')) return;

        $target.querySelector('.selected').classList.remove('selected');
        setFilter(classList[0]);
        classList.add('selected');
    };

    $target.addEventListener('click', clickFilter);
};


export default Filters;