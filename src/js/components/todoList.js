import { TodoItem } from './todoItem.js';
import { VIEW, EDIT, COMPLETE } from '../constant/constant.js';

export class TodoList {
  constructor($target, props, onDeleteItem) {
    this.$target = $target;
    this.state = props;
    this.render();
    this.addEvent(onDeleteItem);
  }
  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // NOTE: 돔의 일부분을 찾아서 바꾸는 것이 좋은가
  //       아니면 돔 자체를 새롭게 생성해주는 것이 좋은가?
  addEvent = (onDeleteItem) => {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      const { className } = target;
      const closestLi = target.closest('li');
      if (className === 'destroy') {
        const index = closestLi.dataset['index'];
        onDeleteItem(index);
      } else if (target.classList.contains('toggle')) {
        target.classList.contains('checked') ?
        target.classList.remove('checked') : target.classList.add('checked');
        closestLi.classList.contains('completed') ?
        closestLi.classList.remove('completed') : target.closest('li').classList.add('completed');
      } 
    });

    this.$target.addEventListener('dblclick', (e) => {
      const { target } = e;
      const { className } = target;
      const closestLi = target.closest('li');
      if (className === 'label') {
        closestLi.classList.add("editing");
      }
    });

    this.$target.addEventListener('keyup', (e) => {
      const { target } = e;
      const { key } = e;
      const closestLi = target.closest('li');
      const targetLabel = closestLi.querySelector('.label');
      if (key !== 'Enter' && key !== 'Escape') return
      if (key === 'Enter') {
        targetLabel.innerHTML = e.target.value;
      }
      closestLi.classList.remove("editing");
      closestLi.classList.add("view");
      target.value = '새로운 타이틀';
    });
  }

  render = () => {
    this.$target.innerHTML = '';
    this.state.map((v, index) => {
      this.$target.insertAdjacentHTML(
        'beforeend',
        new TodoItem(VIEW, v, index).template()
      );
    });
  };
}
