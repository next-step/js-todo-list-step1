import { TodoItem } from "../component/todo/Todo.js";
export class LocalDataBase {
  static DB_NAME = "my-todo-list";
  static loadData() {
    const localStoredArray = JSON.parse(
      localStorage.getItem(LocalDataBase.DB_NAME)
    );
    const resultArray = [];
    localStoredArray.forEach((item) => {
      resultArray.push(new TodoItem(item.data, item.state));
    });
    return resultArray;
  }
  static addItem(todoListArray) {
    todoListArray.push(new TodoItem(data, TodoItem.ACTIVE));
  }
  static deleteItem(index, todoListArray) {
    todoListArray.splice(index, 1);
  }
  static updateItem(index, todoListArray, data) {
    todoListArray[index].data = data;
  }
  static updateItemState(index, todoListArray, state) {
    todoListArray[index].state = state;
  }

  static saveData(todoListArray) {
    localStorage.setItem(LocalDataBase.DB_NAME, JSON.stringify(todoListArray));
  }
}
