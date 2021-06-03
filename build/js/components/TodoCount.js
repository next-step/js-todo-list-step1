/* @jsx createElement */
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { changeType } from '../modules/todos/index.js';

const TodoCount = () => {
  const {
    type,
    todos
  } = useSelector();

  const handleClick = type => {
    store.dispatch(changeType(type));
  };

  const count = todos.filter(todo => {
    if (type === 'all') return true;
    if (type === 'todo') return !todo.done;
    if (type === 'completed') return todo.done;
  }).length;
  return createElement("div", {
    className: "count-container"
  }, createElement("span", {
    className: "todo-count"
  }, "\uCD1D ", createElement("strong", null, count), " \uAC1C"), createElement("ul", {
    className: "filters"
  }, createElement("li", {
    onclick: () => handleClick('all')
  }, createElement("a", {
    className: type === 'all' ? 'all selected' : 'all',
    href: "#"
  }, "\uC804\uCCB4\uBCF4\uAE30")), createElement("li", {
    onclick: () => handleClick('todo')
  }, createElement("a", {
    className: type === 'todo' ? 'active selected' : 'active',
    href: "#active"
  }, "\uD574\uC57C\uD560 \uC77C")), createElement("li", {
    onclick: () => handleClick('completed')
  }, createElement("a", {
    className: type === 'completed' ? 'completed selected' : 'completed',
    href: "#completed"
  }, "\uC644\uB8CC\uD55C \uC77C"))));
};

export default TodoCount;