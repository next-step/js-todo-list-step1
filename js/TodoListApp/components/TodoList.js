import store from '../store/index.js'
import Component from '../lib/component.js'

export default class TodoList extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#todo-list')
    })
  }
  render () {
    console.log('TodoList render', );
    let self = this;
    self.element.innerHTML = `
      <ul id="todo-list" class="todo-list">
        <li>
          <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">새로운 타이틀</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="새로운 타이틀" />
        </li>
        <li class="editing">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">완료된 타이틀</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="완료된 타이틀" />
        </li>
        <li class="completed">
          <div class="view">
            <input class="toggle" type="checkbox" checked/>
            <label class="label">완료된 타이틀</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="완료된 타이틀" />
        </li>
      </ul>
    `
    self.element.addEventListener('click', (ev) => {
      console.log('list click event', );
    })
  }
}