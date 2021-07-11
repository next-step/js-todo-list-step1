import TodoList from './TodoList.js';

export default function TodoApp($app) {
  this.state = ['hi', 'hello'];

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state);
  };

  const todoList = new TodoList({
    $app,
    initialState: this.state,
  });

  const init = () => {
    this.setState({
      ...this.state,
    });
  };
  init();
}
