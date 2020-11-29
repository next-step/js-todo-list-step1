export class TodoItem {
  constructor(contents, state) {
    this.content = this.templateTodoItem(contents);
  }

  templateTodoItem = (contents) => {
    console.log("template :", contents);
    return `<li>
              <div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${contents}</label>
                <button class="destroy"></button>
              </div>
                <input class="edit" value="새로운 타이틀" />
            </li>`;
  };
}
