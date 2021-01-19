import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import { setStorage, getStorage } from "./utils.js";
import { TODO_ITEMS_KEY } from "./constants.js";

export default class TodoApp {
  $target = null;
  $todoList = null;
  $todoInput = null;
  $todoFilter = null;
  data = { todoItems: [...(getStorage(TODO_ITEMS_KEY) || [])] };
  originData = this.data;
  constructor($target) {
    this.$todoInput = new TodoInput({
      $target,
      onAdd: (content) => {
        this.data.todoItems.push({ content, status: "active" });
        this.setState({ todoItems: [...this.data.todoItems] });
      },
    });
    this.$todoList = new TodoList({
      $target,
      data: this.data,
      onComplete: (status, todoIndex) => {
        const { todoItems } = this.data;
        todoItems[todoIndex].status = status;
        this.setState({ todoItems });
      },
      onDelete: (todoIndex) => {
        const nextData = this.data.todoItems.filter((_, i) => i !== todoIndex);
        this.setState({ todoItems: nextData });
      },
      onEdit: (editContent, todoIndex) => {
        const { todoItems } = this.data;
        todoItems[todoIndex].content = editContent;
        this.setState({ todoItems });
      },
    });
    this.$todoCount = new TodoCount({
      $target,
      data: { count: this.data.todoItems?.length || 0 },
    });
    this.$todoFilter = new TodoFilter({
      $target,
      onFilter: (mode) => {
        let nextData;
        if (mode === "") {
          nextData = this.originData.todoItems;
        } else {
          nextData = this.originData.todoItems.filter(
            (todoItem) => todoItem.status === mode
          );
        }

        this.setState({ todoItems: nextData }, true);
      },
    });
  }

  setState(nextData, isFilter = false) {
    if (!isFilter) {
      setStorage(TODO_ITEMS_KEY, [...nextData.todoItems]);
      this.originData = nextData;
    }
    this.data = nextData;
    this.$todoList.setState(nextData);
    this.$todoCount.setState({ count: [...nextData.todoItems].length });
  }
}
