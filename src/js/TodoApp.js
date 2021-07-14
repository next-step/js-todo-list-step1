import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

export default function TodoApp($app) {
  this.state = {
    todoes: [
      {
        idx: 0,
        content: 'hiEvery One',
        state: '',
      },
      {
        idx: 1,
        content: 'Im Tami',
        state: '',
      },
    ],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todoes);
    todoCount.setState(this.state.todoes);
    todoInput.setState(this.state.todoes);
  };

  const todoInput = new TodoInput({
    $app,
    initialState: this.state.todoes,
    onAdd: (contents) => addTodo(contents),
  });

  const todoList = new TodoList({
    $app,
    initialState: this.state.todoes,
    onToggle: (idx) => toggleTodo(idx),
    onDelete: (idx) => deleteTodo(idx),
    onEdit: (idx, isEdit, newContent) => editTodo(idx, isEdit, newContent),
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
      if (todo.idx === idx) {
        todo.state = todo.state === '' ? 'completed' : '';
      }
    });
    this.setState({
      ...this.state,
    });
  };

  const deleteTodo = (idx) => {
    const todos = this.state.todoes;
    const newTodos = todos.filter((todo) => {
      return todo.idx !== idx;
    });

    this.setState({
      todoes: newTodos,
    });
  };

  const editTodo = (idx, isEdit, newContent) => {
    const todos = this.state.todoes;
    todos.map((todo) => {
      if (todo.idx === idx) {
        todo.state = todo.state === '' ? 'editing' : '';
        if (isEdit) {
          todo.content = newContent;
        }
      }
    });
    this.setState({
      ...this.state,
    });
  };
}
