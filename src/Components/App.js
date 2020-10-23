import {
  insertTodo,
  removeTodo,
  toggleTodo,
  updateTodo
} from "../reducer/todo.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default store => {
  const insertTodoItem = text => store.dispatch(insertTodo(text));
  const removeTodoItem = id => store.dispatch(removeTodo(id));
  const toggleTodoItem = id => store.dispatch(toggleTodo(id));
  const updateTodoItem = (id, text) => store.dispatch(updateTodo(id, text));

  const prevTodos = [];

  TodoInput(insertTodoItem);

  /*
  TODO 변경 예정
  newTodos, prevTodos 비교하기
  1. length 가 달라질 경우 추가 새 todo만 보내기
  2. isRemove, isCompleted 와 그 외의 값이 바뀔 경우 해당 todo만 보내기

  받는쪽
  해당 id값 조회
  1.해당 데이터에 추가 신호가 올 경우 or 해당 index 의 데이터가 없을 경우 appendChild
  2.isRemove true 일 경우 removeChild
  3.isCompleted 값을 전달
  4.text 가 바뀌었을 경우 label 에 값 전달

  initTodo
  현재 todos 의 값이 없을 경우 localStorage 에서 값을 불러와 initTodo 로 한번에 그려줌.
  */

  store.subscribe(type => {
    const { todos } = store.getState();

    TodoList({ todos, removeTodoItem, toggleTodoItem, updateTodoItem });
  });
};
