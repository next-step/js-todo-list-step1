import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import Storage from "../utils/Storage.js";

export default function TodoApp() {
  const storage = new Storage();

  const state = {
    todoItems: storage.getTodoItems(),
    filter: "all"
  };

  const FILTER_TYPE = {
    all: () => true,
    active: v => !v.isDone,
    completed: v => v.isDone
  }

  const addTodo = todo => {
    const {todoItems} = state;
    setState([...todoItems, todo]);
  }

  const removeTodo = todoId => {
    const {todoItems} = state;
    setState(todoItems.filter(({id}) => id !== todoId));
  }

  const changeTodoDone = (todoId, status) => {
    setState(state.todoItems.map(todo => {
      if (todoId === todo.id) {
        todo.isDone = status;
      }
      return todo;
    }))
  }

  const updateTodo = ({id, title}) => {
    const newTodoItems = state.todoItems.map(v => {
      if (v.id === id) {
        v.title = title;
        v.isUpdate = false;
      }

      return v;
    });
    setState(newTodoItems);
  }

  const updateTodoStatus = ({id, status}) => {
    const newTodoItems = state.todoItems.map(v => {
      if (v.id === id) {
        v.isUpdate = status;
      }

      return v;
    });
    setState(newTodoItems);
  }

  const filteringTodoItems = () => state.todoItems.filter(FILTER_TYPE[state.filter]);

  const changeFilter = filter => {
    state.filter = filter;
    setState(state.todoItems);
  }

  const setState = todoItems => {
    state.todoItems = todoItems;
    storage.updateTodoItems(todoItems);
    const data = filteringTodoItems()
    new TodoList({"todoItems": data, removeTodo, changeTodoDone, updateTodoStatus, updateTodo}).render();
    new TodoCount({"todoItems": data});
  }

  new TodoFilter({changeFilter})
  setState(state.todoItems);

  return {
    render: function () {
      new TodoInput({addTodo})
    }
  }
}
