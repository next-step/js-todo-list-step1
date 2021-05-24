import { getElement } from './util.js';
import { FILTER_TYPE, UI_CLASS } from './constant.js';

class Filters {
    constructor(store) {
        this.store = store;
        this.filtersEl = getElement('ul.filters');
        this.init();
    }

    init() {
        this.filtersEl.addEventListener('click', this.filtersHandler.bind(this));
    }

    filtersHandler({ target }) {
        if (target.tagName !== 'A') return;
        const type = target.classList[0];

        this.filtersEl.querySelectorAll('a').forEach(el => {
            el.classList.remove(UI_CLASS.SELECTED);
            if (el.classList.contains(type)) el.classList.add(UI_CLASS.SELECTED);
        });

        this.store.set({
            filter: FILTER_TYPE[type.toUpperCase()]
        });
    }
}

export default Filters
