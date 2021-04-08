import TodoList from './TodoList.js';
/**
 *
 * @param {Element} $target
 */

const App = ($target) => {
  render();
  // initiall render
  function render() {
    TodoList();
  }
};

export default App;
