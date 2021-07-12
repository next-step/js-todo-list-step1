import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

export default function TodoApp($app) {
  this.state = {
    todoes: ["hi I'm Tami"],
    count: 0,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todoes);
    todoCount.setState(this.state.count);
  };

  new TodoInput({
    $app,
    onAdd: (contents) => {
      this.state.todoes.push(contents);
      this.setState(this.state);
    },
  });
  const todoList = new TodoList({
    $app,
    initialState: this.state.todoes,
  });
  const todoCount = new TodoCount({
    $app,
    initialState: this.state.count,
  });

  const init = () => {
    this.setState({
      ...this.state,
    });
  };
  init();
}
