import Subject from './Subject.js';
import todosData from '../model/TodosModel.js';
import todoList from '../components/TodoList.js';
import todoCount from '../components/TodoCount.js';

class TodosSubject extends Subject {
  constructor() {
    super(todosData);
  }

  createTodo(todoTitle) {
    this.data.createTodo(todoTitle);
    this.notifyObservers();
  }

  updateTodoIsCompleted(index, isCompleted) {
    this.data.updateTodoIsCompleted(index, isCompleted);
  }

  updateTodoTitle(index, todoTitle) {
    this.data.updateTodoTitle(index, todoTitle);
    this.notifyObservers();
  }

  deleteTodo(index) {
    this.data.deleteTodo(index);
    this.notifyObservers();
  }

  rerender() {
    this.notifyObservers();
  }
}

const todosSubject = new TodosSubject();

export default todosSubject;
