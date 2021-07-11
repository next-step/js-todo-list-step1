export default class TodoList {
  constructor(todoItems) {
    this.todoList = document.querySelector('#todo-list');
    this.todoItems = todoItems;
    console.log(todoItems)
    this.render();
  }
  render(){
    const todoItemTemplate = (text) => {
      return `
        <li>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">${text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value=${text} />
        </li>
        `
    }
    const template = this.todoItems.map((todo)=>todoItemTemplate(todo));
    this.todoList.innerHTML = template.join("");
  }
}
