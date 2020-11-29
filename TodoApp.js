import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import { setStorage, getStorage } from "./utils.js";

export default class TodoApp {
  $target = null;
  $todoList = null;
  $todoInput = null;
  $todoFilter = null;
  data = { todoItems: [...(getStorage("todoItems") || [])] };
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
      setStorage("todoItems", [...nextData.todoItems]);
      this.originData = nextData;
    }
    this.data = nextData;
    this.$todoList.setState(nextData);
    this.$todoCount.setState({ count: [...nextData.todoItems].length });
    this.render();
  }

  render() {}
}
