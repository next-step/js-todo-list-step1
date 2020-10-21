import TodoEditItem from './TodoEditItem.js';
import TodoViewItem from './TodoViewItem.js';

const TodoItem = ({ index, contents, complete, editing }) => {

    return `
        <li class="view ${ editing && 'editing' || complete && 'completed' }" data-index="${ index }">
             ${ editing ? TodoEditItem({ contents }) : TodoViewItem({ complete, contents }) }
        </li> 
    `;
};

export default TodoItem;
