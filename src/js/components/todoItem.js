import { VIEW, EDIT, COMPLETE } from "../constant/constant.js";

export class TodoItem {
  constructor(state, title) {
    this.state = state;
    this.title = title;
  }
  template() {
    let template = '<ul id="todo-list" class="todo-list">';
    switch (this.state) {
      case VIEW:
        template += `<li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${this.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`;
        break;
      case EDIT:
        template += `<li class="editing">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">완료된 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`;
        break;
      case COMPLETE:
        template += `<li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox" checked/>
      <label class="label">완료된 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`;
        break;
    }
    template += "</ul>";
    return template;
  }
}
