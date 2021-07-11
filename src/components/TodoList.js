export default class TodoList {
  constructor() {
    this.todoList = document.querySelector('#todo-list');
  }
  render(todoItems){
    const todoItemTemplate = (id, text) => {
      return `
        <li data-id=${id}>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">${text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value=${text} />
        </li>
        `
    }
    const template = todoItems.map((todo,id)=>todoItemTemplate(id,todo));
    this.todoList.innerHTML = template.join("");
  }
  setEvent({onDelete}){
    this.todoList.addEventListener('click', onDelete);
  }
}
