import { $ } from "./utils/querySelector.js";
import { STATUS_TYPE } from "./utils/Constants.js";

import { TodoItem } from "../js/components/TodoItem.js";
import { TodoInput } from "../js/components/TodoInput.js";

// 부모 컴포넌트
function TodoApp() {
  this.todoItems = [];

  new TodoInput({
    onAdd: (content) => {
      const newTodoItem = new TodoItem(id++, content, STATUS_TYPE.ACTIVE);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      console.log(this.todoItems);
    },
  });

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
  };

  this.init = () => {};
}

const app = new TodoApp();
app.init();
