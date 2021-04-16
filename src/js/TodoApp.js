import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

function TodoApp() {
  // console.log(this); // * this는 TodoApp{}이다.

  this.todoItems = [];
  // const todoItems = []; // * 이거와 무슨 차이? 그냥 const로 하면 지역변수라 날아가나?

  const todoInput = new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new this.todoItems(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  const todoList = new TodoList({});

  // const todoCount = new TodoCount({});

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };
}

export default TodoApp; // default의 의미는?
