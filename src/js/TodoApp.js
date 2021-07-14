import TodoFilter from './components/TodoFilter.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import { FILTER_TYPES } from '../utils/const.js';

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
    todoesFiltered: [],
    filterState: FILTER_TYPES.ALL,
    todoesCount: '0',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(nextState);
    todoInput.setState(nextState);
    todoFilter.setState(nextState);
  };

  const todoInput = new TodoInput({
    $app,
    initialState: this.state,
    onAdd: (contents) => addTodo(contents),
  });

  const todoList = new TodoList({
    $app,
    initialState: this.state,
    onToggle: (idx) => toggleTodo(idx),
    onDelete: (idx) => deleteTodo(idx),
    onEdit: (idx, isEdit, newContent) => editTodo(idx, isEdit, newContent),
  });
  const todoFilter = new TodoFilter({
    $app,
    initialState: this.state,
    onFilter: (filterType) => filterTodo(filterType),
  });

  const init = () => {
    this.setState({
      ...this.state,
    });
  };
  init();

  const addTodo = (addContent) => {
    const { todoes } = this.state;
    const nextIdx = Math.max(0, ...todoes.map((todo) => todo.idx)) + 1;
    const newTodo = {
      idx: nextIdx,
      content: addContent,
      state: '',
      edit: '',
    };
    todoes.push(newTodo);

    this.setState({
      ...this.state,
    });
  };

  const toggleTodo = (idx) => {
    const { todoes } = this.state;

    todoes.map((todo) => {
      if (todo.idx === idx) {
        todo.state = todo.state === '' ? FILTER_TYPES.COMPLETE : '';
      }
    });
    this.setState({
      ...this.state,
    });
  };

  const deleteTodo = (idx) => {
    const { todoes } = this.state;

    const resetTodoes = todoes.filter((todo) => {
      return todo.idx !== idx;
    });

    this.setState({
      todoes: resetTodoes,
    });
  };

  const editTodo = (idx, isEdit, newContent) => {
    const { todoes } = this.state;

    todoes.map((todo) => {
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
    const { todoes } = this.state;
    if (filterType === FILTER_TYPES.ALL) {
      this.setState({
        ...this.state,
        filterState: FILTER_TYPES.ALL,
        todoesCount: todoes.length,
      });
    } else if (filterType === FILTER_TYPES.COMPLETE) {
      const completedTodoes = todoes.filter(
        (todo) => todo.state === FILTER_TYPES.COMPLETE
      );

      this.setState({
        ...this.state,
        todoesFiltered: completedTodoes,
        filterState: FILTER_TYPES.COMPLETE,
        todoesCount: completedTodoes.length,
      });
    } else if (filterType === FILTER_TYPES.ACTIVE) {
      const activeTodoes = todoes.filter(
        (todo) => todo.state !== FILTER_TYPES.COMPLETE
      );
      this.setState({
        ...this.state,
        todoesFiltered: activeTodoes,
        filterState: FILTER_TYPES.ACTIVE,
        todoesCount: activeTodoes.length,
      });
    }
  };
}
