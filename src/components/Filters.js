import { setFilter} from '../store.js';

class Filters {
    $target;

    constructor (target) {
        this.$target = target;
        this.setEvent();
    }

    clickFilter = ({ target }) => {
        const { classList } = target;
        const { $target } = this;

        if (classList.contains('selected')) return;

        $target.querySelector('.selected').classList.remove('selected');
        setFilter(classList[0]);
        classList.add('selected');
    };

    setEvent () {
        const { $target, clickFilter } = this;
        $target.addEventListener('click', clickFilter)
    }
}

export default Filters;