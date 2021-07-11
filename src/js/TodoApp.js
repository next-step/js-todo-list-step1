import TodoList from './TodoList.js';

export default function TodoApp($app) {
  this.state = {
    todoes: ['hi', 'hello'],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todoes);
  };

  const todoList = new TodoList({
    $app,
    initialState: this.state.todoes,
  });

  const init = () => {
    this.setState({
      ...this.state,
    });
  };
  init();
}
