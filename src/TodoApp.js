import TodoInput from "./TodoInput.js";
import TodoItem, { VIEW, EDITING, COMPLETED } from "./TodoItem.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";

export default function TodoApp($todoApp) {
  this.todoItems = [];

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    localStorage.setItem("todos", JSON.stringify(this.todoItems));
    const filtered = this.getFilteredItem(location.hash.replace("#", ""));
    this.render(filtered);
  };

  this.getFilteredItem = (filter) => {
    let filterStatus = [];

    switch (filter) {
      case "active":
        filterStatus = [VIEW, EDITING];
        break;
      case "completed":
        filterStatus = [COMPLETED];
        break;
      default:
        filterStatus = [VIEW, EDITING, COMPLETED];
        break;
    }

    return this.todoItems.filter(
      (item) => filterStatus.indexOf(item.status) !== -1
    );
  };

  this.render = (items) => {
    todoList.render(items);
    todoCount.render(items.length);
  };

  const todoList = new TodoList($todoApp.querySelector("#todo-list"), {
    changeStatus: (id, status) => {
      const newTodoItems = this.todoItems.map((item) => {
        if (`item-${item.id}` === id) {
          item.status = status;
        }

        return item;
      });

      this.setState(newTodoItems);
    },
    removeItem: (id) => {
      const newTodoItems = this.todoItems.filter(
        (item) => `item-${item.id}` !== id
      );

      this.setState(newTodoItems);
    },
    editItem: (id, contents) => {
      const newTodoItems = this.todoItems.map((item) => {
        if (`item-${item.id}` === id) {
          item.contents = contents;
        }

        return item;
      });

      this.setState(newTodoItems);
    },
  });

  new TodoInput($todoApp.querySelector("#new-todo-title"), {
    onAdd: (contents) => {
      const itemsLength = this.todoItems.length;
      const id = itemsLength
        ? `${parseInt(this.todoItems[itemsLength - 1].id) + 1}`
        : "1";
      const newTodoItem = new TodoItem({ id, contents });
      this.setState([...this.todoItems, newTodoItem]);
    },
  });

  const todoCount = new TodoCount($todoApp.querySelector(".count-container"), {
    parentRender: this.render,
    getFilteredItem: this.getFilteredItem,
  });

  const todosJson = localStorage.getItem("todos");
  todosJson && this.setState(JSON.parse(todosJson));

  // 페이지 들어왔을 때 hash확인해서 필터 선택되게
  const initFilter = location.hash.replace("#", "");
  initFilter && todoCount.changeSelected(location.hash.replace("#", ""));
}
