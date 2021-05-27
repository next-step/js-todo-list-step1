import { VIEW, EDIT, COMPLETE } from '../constant/constant.js';

export class TodoItem {
  constructor(state, title, index) {
    this.state = state;
    this.title = title;
    this.index = index;
  }
  template() {
    let template = '';
    switch (this.state) {
      case VIEW:
        template += `<li data-index=${this.index}>
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
        template += `<li class="completed" data-index=${this.index}>
    <div class="view">
      <input class="toggle" type="checkbox" checked/>
      <label class="label">${this.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`;
        break;
    }
    return template;
  }
}
