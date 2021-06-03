/* @jsx createElement */
import { createElement } from './lib/React.js';
import TodoApp from './components/TodoApp.js';
import TodoInput from './components/TodoInput.js';
import ToggleAll from './components/ToggleAll.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';

const App = () => {
  return createElement(TodoApp, null, createElement(ToggleAll, null), createElement(TodoInput, null), createElement(ToggleAll, null), createElement(TodoList, null), createElement(TodoCount, null));
};

export default App;