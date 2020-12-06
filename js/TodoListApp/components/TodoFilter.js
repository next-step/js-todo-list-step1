import store from './../store/index.js'
import Component from './../lib/component.js'

export default class TodoFilter extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.count-container')
    })
  }

  render () {
    let self = this;

    self.element.innerHTML = `
      <span class="todo-count">총 <strong>${store.state.list.length}</strong> 개</span>
      <ul class="filters">
        <li>
          <a class="all ${(store.state.filteredType === '') ? 'selected' : ''}" href="/#">전체보기</a>
        </li>
        <li>
          <a class="active ${(store.state.filteredType === 'active') ? 'selected' : ''}" href="#active">해야할 일</a>
        </li>
        <li>
          <a class="completed ${(store.state.filteredType === 'completed') ? 'selected' : ''}" href="#completed">완료한 일</a>
        </li>
      </ul>
    `
    window.addEventListener('hashchange', (ev) => {
      store.dispatch('setFilteredType', ev.newURL.split('#')[1])
    })
  }
}