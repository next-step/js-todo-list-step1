/* @jsx createElement */
import useLocalStorage from '../hooks/useLocalStorage.js';
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import {
  changeMode,
  removeTodo,
  toggleTodo,
  updateTodo,
} from '../modules/todos/index.js';

const TodoListItem = ({ todo }) => {
  const checked = todo.done;
  const todos = useSelector((state) => state.todos);
  const [_, setData] = useLocalStorage('todos');
  setData(todos);

  const toggleClick = () => {
    store.dispatch(toggleTodo(todo.id));
  };

  const deleteClick = () => {
    store.dispatch(removeTodo(todo.id));
  };

  const changeModeClick = () => {
    store.dispatch(changeMode(todo.id));
  };

  const makeClassName = () => {
    if (todo.done) {
      return todo.editMode ? 'completed editing' : 'completed';
    }
    return todo.editMode ? 'editing' : '';
  };

  const editChange = (e) => {
    if (e.key === 'Enter') {
      store.dispatch(updateTodo({ id: todo.id, content: e.target.value }));
      store.dispatch(changeMode(todo.id));
    }
    if (e.key === 'Escape') {
      store.dispatch(changeMode(todo.id));
    }
  };

  return (
    <li className={makeClassName()} ondblclick={changeModeClick}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onclick={toggleClick}
          checked={checked}
        />
        <label className="label">{todo.content}</label>
        <button className="destroy" onclick={deleteClick}></button>
      </div>
      <input className="edit" value={todo.content} onkeyup={editChange} />
    </li>
  );
};

export default TodoListItem;
