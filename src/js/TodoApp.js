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
        idx: 1,
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
    onAdd: (contents) => addTodo(contents),
  });

  const todoList = new TodoList({
    $app,
    initialState: this.state.todoes,
    onToggle: (idx) => toggleTodo(idx),
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

  const addTodo = (contents) => {
    const todos = this.state.todoes;
    const nextIdx = Math.max(0, ...todos.map((todo) => todo.idx)) + 1;
    console.log('next', nextIdx);
    const newTodo = {
      idx: nextIdx,
      content: contents,
      state: '',
      edit: '',
    };
    this.state.todoes.push(newTodo);

    this.setState({
      ...this.state,
    });
  };

  const toggleTodo = (idx) => {
    const todos = this.state.todoes;

    todos.map((todo) => {
      if (todo.idx === parseInt(idx)) {
        todo.state = todo.state === '' ? 'complete' : '';
      }
    });
    this.setState({
      ...this.state,
    });
  };
}
