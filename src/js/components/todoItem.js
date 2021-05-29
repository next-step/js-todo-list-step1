import { VIEW, EDIT, COMPLETE } from '../constant/constant.js';

export class TodoItem {
  constructor(state, title, index) {
    this.state = state;
    this.title = title;
    this.index = index;
  }
  template() {
    const classTemplate = this.state === COMPLETE ? 'class="completed"' : '';
    const checkedTemplate = this.state === COMPLETE ? 'checked' : '';
    let template = `<li ${classTemplate} data-index=${this.index}>
    <div class="view">
      <input class="toggle" type="checkbox" ${checkedTemplate}/>
      <label class="label">${this.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`;
    return template;
  }
}
