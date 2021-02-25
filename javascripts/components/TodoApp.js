import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import Storage from "../utils/Storage.js";
import ItemFilter from "../utils/ItemFilter.js";

export default function TodoApp() {
  const storage = new Storage();
  const filter = new ItemFilter();

  const state = {
    todoItems: storage.getTodoItems(),
    type: "all"
  };



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

  const updateTodo = ({todoId, title}) => {
    const newTodoItems = state.todoItems.map(v => {
      if (v.id === todoId) {
        v.title = title;
        v.isUpdate = false;
      }

      return v;
    });
    setState(newTodoItems);
  }

  const updateTodoStatus = ({todoId, status}) => {
    const newTodoItems = state.todoItems.map(v => {
      if (v.id === todoId) {
        v.isUpdate = status;
      }

      return v;
    });
    setState(newTodoItems);
  }


  const changeFilter = type => {
    state.type = type;
    setState(state.todoItems);
  }

  const setState = newItems => {
    state.todoItems = newItems;

    const {todoItems, type} = state;
    storage.updateTodoItems(todoItems);

    const data = filter.filteringTodoItems(type , todoItems);

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
