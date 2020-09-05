import { addItem } from '../store.js';

class NewTodoTitle {
    $target;

    constructor (target) {
        this.$target = target;
        this.setEvent();
    }

    setEvent () {
        const { $target } = this;
        $target.addEventListener('keypress', ({ target, key }) => {
            const contents = target.value;
            if (contents !== '' && key === 'Enter') {
                addItem(contents);
                target.value = '';
            }
        });
    }
}

export default NewTodoTitle;