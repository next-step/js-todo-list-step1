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
      const index = closestLi.dataset['index'];
      if (className === 'destroy') {
        onDeleteItem(index);
      } else if (target.classList.contains('toggle')) {

        // 1번 방법 --> 돔을 찾아서 attribute의 일부를 변경한다.

        // target.classList.contains('checked') ?
        // target.classList.remove('checked') : target.classList.add('checked');
        // closestLi.classList.contains('completed') ?
        // closestLi.classList.remove('completed') : target.closest('li').classList.add('completed');

        // 2번 방법 --> 돔을 찾아서 완전히 갈아끼운다.

        if (closestLi.classList.contains('completed')) {
          const value = closestLi.querySelector('.label').innerHTML;
          this.$target.removeChild(this.$target.children.item(index));
          if (index === '0') {
            this.$target.insertAdjacentHTML('afterbegin', new TodoItem(VIEW, value, index).template());
          } else {
            this.$target.children.item(index-1).insertAdjacentHTML('afterend', new TodoItem(VIEW, value, index).template());
          }
        } else {
          const value = closestLi.querySelector('.label').innerHTML;
          this.$target.removeChild(this.$target.children.item(index));
          if (index === '0') {
            this.$target.insertAdjacentHTML('afterbegin', new TodoItem(COMPLETE, value, index).template());
          } else {
            this.$target.children.item(index-1).insertAdjacentHTML('afterend', new TodoItem(COMPLETE, value, index).template());
          }
        }
      } 
    });

    this.$target.addEventListener('dblclick', (e) => {
      const { target } = e;
      const { className } = target;
      const closestLi = target.closest('li');
      const inputElem = closestLi.querySelector('.edit');
      if (className === 'label') {
        closestLi.classList.add("editing");
        inputElem.focus();
        inputElem.value = '새로운 타이틀...';
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
