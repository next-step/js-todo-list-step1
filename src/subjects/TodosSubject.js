import Subject from './Subject.js';
import todosData from '../model/TodosModel.js';
import todoList from '../components/TodoList.js';

class TodosSubject extends Subject {
  constructor() {
    super(todosData);
  }

  createTodo(todoTitle) {
    this.data.createTodo(todoTitle);
    this.notifyObservers();
  }

  updateTodo(index, isCompleted) {
    this.data.updateTodo(index, isCompleted);
    this.notifyObservers();
  }

  deleteTodo(index) {
    this.data.deleteTodo(index);
    this.notifyObservers();
  }
}

const todosSubject = new TodosSubject();
todosSubject.registerObserver(todoList);

export default todosSubject;
