'use strict';

export default function TodoList() {
  this.$todoList = document.querySelector("#todo-list");

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map((item) => todoItemTemplate(item));
    this.$todoList.innerHTML = template.join("");
  };
}

function todoItemTemplate(item) {
  const todoItem = `<li>
                      <div class="view">
                        <input class="toggle" type="checkbox"/>
                        <label class="label">${item.contents}</label>
                        <button class="destroy"></button>
                      </div>
                      <input class="edit" value="${item.contents}" />
                    </li>`;
  return todoItem;
}