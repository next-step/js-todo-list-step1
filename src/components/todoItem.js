import todoEditItem from './todoEditItem.js';
import todoViewItem from './todoViewItem.js';
const todoItem = (content, index, completed, editing) => {
  return `<li class="view ${
    (completed && 'completed') || (editing && 'editing')
  }"
  data-index=${index}>
    ${editing ? todoEditItem(content) : todoViewItem(content, completed)}
    </li>`;
};

export default todoItem;
