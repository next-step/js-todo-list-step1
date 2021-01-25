import TodoItem from '../components/TodoItem.js';

/*
localStorage의 todos 프로퍼티에 할일 목록을 아래와 같은 형태의 객체로 관리
{
  data: {title, index, isCompleted}[],
  autoindex: number
}
*/

class TodosData {
  constructor() {
    // 로컬 스토리지가 비어있다면
    if (!localStorage.todos) {
      this.data = {};
      this.autoindex = 0;
      this.saveToLocalStorage();
    } else {
      const currStorage = JSON.parse(localStorage.todos);
      this.data = currStorage.data;
      this.autoindex = Number(currStorage.autoindex);
    }
  }

  get datas() {
    return this.data;
  }

  saveToLocalStorage() {
    localStorage.todos = JSON.stringify({ data: this.data, autoindex: this.autoindex });
  }

  createTodo(todoTitle) {
    this.data[this.autoindex] = new TodoItem(todoTitle, this.autoindex);
    this.autoindex++;
    this.saveToLocalStorage();
  }

  updateTodoIsCompleted(index, isCompleted) {
    this.data[index].isCompleted = isCompleted;
    this.saveToLocalStorage();
  }

  deleteTodo(index) {
    if (this.data[index] !== undefined) {
      delete this.data[index];
      this.saveToLocalStorage();
    }
  }
}

const todosData = new TodosData();

export default todosData;
