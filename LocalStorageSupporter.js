export class LocalStorageSupporter {
  constructor(key) {
    this.key = key;
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  save(todoItem) {
    const todoItems = this.get();
    todoItems.push(todoItem);
    localStorage.setItem(this.key, JSON.stringify(todoItems));
  }

  complete(todoItem) {
    const localTodoItem = this.get();
    localTodoItem.filter((item) => item.todoItem === todoItem)
                 .map((item) => (item.completed = !item.completed));

    localStorage.setItem(this.key, JSON.stringify(localTodoItem));
  }

  delete(todoItem) {
    const todoItems = this.get();
    const index = todoItems.findIndex(
        (item) => item.todoItem === todoItem
    );
    todoItems.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(todoItems));
  }

  update(id, todoItem){
    const todoItems = this.get();
    const index = todoItems.findIndex((item) => item.todoItem === id);
    todoItems[index].todoItem = todoItem;
    localStorage.setItem(this.key, JSON.stringify(todoItems));
    return todoItems;
  }
}
