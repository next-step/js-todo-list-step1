export default class TodoList {
  constructor() {
    this.todoList = document.querySelector('#todo-list');
  }
  render(todoItems){
    const todoItemTemplate = (todo) => {
      return `
        <li data-id="${todo.id}" class="${todo.complete ? 'completed' : ''}">
            <div class="view">
            <input class="toggle" type="checkbox" ${todo.complete ? 'checked' : ''} />
              <label class="label">${todo.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value=${todo.text} />
        </li>
        `
    }
    const template = todoItems.map((todo)=>todoItemTemplate(todo));
    this.todoList.innerHTML = template.join("");
  }
  setEvent({onDelete,onCompleted}){
    this.todoList.addEventListener('click', onDelete);
    this.todoList.addEventListener('click', onCompleted);
  }
}
