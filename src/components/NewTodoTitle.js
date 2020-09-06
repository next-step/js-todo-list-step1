import { addItem } from '../store.js';
import { addEventListener } from '../utils.js';

const NewTodoTitle = ($target) => {
    const _addItem = ({ event: { target, key } }) => {
        const contents = target.value;
        if (contents !== '' && key === 'Enter') {
            addItem(contents);
            target.value = '';
        }
    };

    addEventListener($target, 'keypress', 'new-todo', _addItem);
};


export default NewTodoTitle;
