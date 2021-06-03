/* @jsx createElement */
import useLocalStorage from '../hooks/useLocalStorage.js';
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { addTodo } from '../modules/todos/index.js';

const TodoInput = () => {
  const todos = useSelector(state => state.todos);
  const [_, setData] = useLocalStorage('todos');
  setData(todos);

  const handleChange = e => {
    store.dispatch(addTodo(e.target.value));
    document.getElementById('new-todo-title').focus();
  };

  return createElement("div", null, createElement("input", {
    id: "new-todo-title",
    className: "new-todo",
    placeholder: "\uD560\uC77C\uC744 \uCD94\uAC00\uD574\uC8FC\uC138\uC694",
    autofocus: true,
    onchange: handleChange
  }));
};

export default TodoInput;