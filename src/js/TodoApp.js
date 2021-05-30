import { $ } from "./utils/querySelector.js";
import { STATUS_TYPE } from "./utils/Constants.js";

import { TodoItem } from "../js/components/TodoItem.js";
import { TodoInput } from "../js/components/TodoInput.js";
import { TodoList } from "../js/components/TodoList.js";
import { TodoCheckBox } from "./components/TodoCheckBox.js";

function TodoApp() {
  this.todoItems = [];
  let id = 0;

  new TodoInput({
    onAdd: (content) => {
      const newTodoItem = new TodoItem(id++, content, STATUS_TYPE.ACTIVE);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  new TodoCheckBox({
    onCheck: (checkedListId) => {
      const listId = parseInt(checkedListId);
      const updatedItems = this.todoItems.map((item) =>
        item.swapCheckStatus(listId)
      );
      this.setState(updatedItems); // 전체를 한번에 업데이트
    },
  });

  const todoList = new TodoList({});

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  this.init = () => {
    todoList.setState(this.todoItems);
  };
}

const app = new TodoApp();
app.init();
