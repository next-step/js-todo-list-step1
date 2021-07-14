import TodoFilter from './components/TodoFilter.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';

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
    filterTodoes: [],
    isFilter: false,
    todoesCount: '0',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state);
    todoInput.setState(this.state);
    todoFilter.setState(this.state);
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
  const todoFilter = new TodoFilter({
    $app,
    initialState: this.state.count,
    onFilter: (filterType) => filterTodo(filterType),
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

  const filterTodo = (filterType) => {
    const todos = this.state.todoes;

    if (filterType === 'all selected') {
      this.setState({
        ...this.state,
        isFilter: false,
        todoesCount: todos.length,
      });
    } else if (filterType === 'completed') {
      const completedTodos = todos.filter((todo) => todo.state === 'completed');

      this.setState({
        ...this.state,
        filterTodoes: completedTodos,
        isFilter: true,
        todoesCount: completedTodos.length,
      });
    } else if (filterType === 'active') {
      const decompletedTodos = todos.filter(
        (todo) => todo.state !== 'completed'
      );
      this.setState({
        ...this.state,
        filterTodoes: decompletedTodos,
        isFilter: true,
        todoesCount: decompletedTodos.length,
      });
    }
  };
}
