import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

export default function TodoApp($app) {
  this.state = {
    todoes: [
      {
        idx: 0,
        content: 'hi EveryOne',
        state: '',
        edit: '',
      },
      {
        idx: 2,
        content: "I'm Tami",
        state: '',
        edit: '',
      },
    ],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todoes);
    todoCount.setState(this.state.todoes);
  };

  new TodoInput({
    $app,
    onAdd: (contents) => {
      const prevIdx = this.state.todoes[this.state.todoes.length - 1].idx;

      const newTodo = {
        idx: prevIdx + 1,
        content: contents,
        state: '',
        edit: '',
      };
      this.state.todoes.push(newTodo);

      this.setState({
        ...this.state,
      });
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
