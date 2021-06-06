/* @jsx createElement */
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { changeType } from '../modules/todos/index.js';

const TodoCount = () => {
  const { type, todos } = useSelector();

  const handleClick = (type) => {
    store.dispatch(changeType(type));
  };

  const count = todos.filter((todo) => {
    if (type === 'all') return true;
    if (type === 'todo') return !todo.done;
    if (type === 'completed') return todo.done;
  }).length;

  return (
    <div className="count-container">
      <span className="todo-count">
        총 <strong>{count}</strong> 개
      </span>
      <ul className="filters">
        <li onclick={() => handleClick('all')}>
          <a className={type === 'all' ? 'all selected' : 'all'} href="#">
            전체보기
          </a>
        </li>
        <li onclick={() => handleClick('todo')}>
          <a
            className={type === 'todo' ? 'active selected' : 'active'}
            href="#active"
          >
            해야할 일
          </a>
        </li>
        <li onclick={() => handleClick('completed')}>
          <a
            className={
              type === 'completed' ? 'completed selected' : 'completed'
            }
            href="#completed"
          >
            완료한 일
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TodoCount;
