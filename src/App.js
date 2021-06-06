/* @jsx createElement */
import { createElement } from './lib/React.js';
import TodoApp from './components/TodoApp.js';
import TodoInput from './components/TodoInput.js';
import ToggleAll from './components/ToggleAll.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';

const App = () => {
  return (
    <TodoApp>
      <ToggleAll />
      <TodoInput />
      <ToggleAll />
      <TodoList />
      <TodoCount />
    </TodoApp>
  );
};

export default App;
