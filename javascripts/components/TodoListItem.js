import ItemWrapper from "./todo-item/TodoItemWrapper.js";
import ItemCheckBox from "./todo-item/TodoItemCheckBox.js";
import ItemTitle from "./todo-item/TodoItemTitle.js";
import ItemDestroy from "./todo-item/TodoItemDestroy.js";
import TodoItemUpdateTitle from "./todo-item/TodoItemUpdateTitle.js";

export default function TodoListItem({todo, removeTodo, changeTodoDone, updateTodoStatus, updateTodo}) {

  const {id, title, isDone, isUpdate} = todo;

  const li = new ItemWrapper({isDone, isUpdate});
  const todoCheckbox = new ItemCheckBox({id, isDone, isUpdate, changeTodoDone})
  const todoDestroy = new ItemDestroy({id, removeTodo});

  const titleRender = () => {
    return isUpdate ? new TodoItemUpdateTitle({id, title, updateTodo, updateTodoStatus}) : new ItemTitle({
      id,
      title,
      updateTodoStatus
    });
  }

  return {
    render: () => {
      const todoTitle = titleRender();
      return li.addItemChild({"todoTitle": todoTitle, todoCheckbox, todoDestroy});
    }
  }
}

