import { addItem } from '../store.js';

const NewTodoTitle = ($target) => {
    $target.addEventListener('keypress', ({ target, key }) => {
        const contents = target.value;
        if (contents !== '' && key === 'Enter') {
            addItem(contents);
            target.value = '';
        }
    });
};

export default NewTodoTitle;