import { STATUS } from "./constantsKey.js";
import { getStorageData } from "./handleStorage.js";
import { dispatch } from "../App.js";

export const handleData = {
  onAdd: (inputVal) => {
    const originTodos = getStorageData();
    const newTodos = [
      ...originTodos,
      { idx: Date.now(), content: inputVal, isCompleted: false },
    ];
    dispatch(newTodos);
  },
  onToggle: (idx) => {
    const originTodos = getStorageData();
    const newTodos = originTodos.map((todo) => {
      if (todo.idx === parseInt(idx, 10)) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    dispatch(newTodos);
  },
  onRemove: (idx) => {
    const originTodos = getStorageData();
    const newTodos = originTodos.filter(
      (todo) => todo.idx !== parseInt(idx, 10)
    );
    dispatch(newTodos);
  },
  onChange: ({ idx, content }) => {
    const originTodos = getStorageData();
    const newTodos = originTodos.map((todo) => {
      if (todo.idx === parseInt(idx, 10)) {
        return {
          ...todo,
          content: content,
        };
      }
      return todo;
    });
    dispatch(newTodos);
  },
  onBindStatus: (status) => {
    const originTodos = getStorageData();
    dispatch(originTodos, { status: status });
  },
  onSetStatus: (status) => {
    const originTodos = getStorageData();
    const todosBy = {
      [STATUS.ACTIVE]: originTodos.filter((todo) => !todo.isCompleted),
      [STATUS.COMPLETED]: originTodos.filter((todo) => todo.isCompleted),
    };
    return todosBy[status] || originTodos;
  },
};
