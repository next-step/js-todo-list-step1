/* @jsx createElement */
import { createElement } from '../lib/React.js';

const TodoApp = ({ children }) => {
  return (
    <div className="todoapp">
      <h1>TODOS</h1>
      <main>{children}</main>
    </div>
  );
};

export default TodoApp;
