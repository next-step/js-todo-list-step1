import TodoCount from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

function App($target) {
  this.init = () => {
    this.$target = $target;
    this.state = {
      todoCounts: {},
      todos: [],
    };
  };

  this.setState = (nextState) => {};

  this.init();
}

export default App;
