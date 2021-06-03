/* @jsx createElement */
import { createElement } from '../lib/React.js';

const TodoApp = ({
  children
}) => {
  return createElement("div", {
    className: "todoapp"
  }, createElement("h1", null, "TODOS"), createElement("main", null, children));
};

export default TodoApp;