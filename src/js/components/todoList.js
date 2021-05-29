import { TodoItem } from './todoItem.js';
import { ALL, VIEW, EDIT, COMPLETE } from '../constant/constant.js';

export class TodoList {
  constructor($target, { state, onDeleteItem, changeTodoState, changeTodoValue }) {
    this.$target = $target;
    this.state = state;
    this.render();
    this.addEvent(onDeleteItem, changeTodoState, changeTodoValue);
  }
  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  addEvent = (onDeleteItem, changeTodoState, changeTodoValue) => {
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

        // const value = closestLi.querySelector('.label').innerHTML;
        // this.$target.removeChild(this.$target.children.item(index));
        // if (closestLi.classList.contains('completed')) {
        //   if (index === '0') {
        //     this.$target.insertAdjacentHTML('afterbegin', new TodoItem(VIEW, value, index).template());
        //   } else {
        //     this.$target.children.item(index-1).insertAdjacentHTML('afterend', new TodoItem(VIEW, value, index).template());
        //   }
        // } else {
        //   if (index === '0') {
        //     this.$target.insertAdjacentHTML('afterbegin', new TodoItem(COMPLETE, value, index).template());
        //   } else {
        //     this.$target.children.item(index-1).insertAdjacentHTML('afterend', new TodoItem(COMPLETE, value, index).template());
        //   }
        // }


        // NOTE : 현재 컴포넌트에서 상태를 바꾸는 짓을 하지 말자 -> 확장이 어렵다
        //      : 즉 1, 2번을 쓰지 말자는 이야기이다.
        //      : 따라서 현재 컴포넌트는 부모 컴포넌트에게 상태를 바꿔야 함을 알려주고
        //      : 부모 컴포넌트는 새로운 상태로 컴포넌트를 새로 그리자

        // 3번 방법 --> 부모 컴포넌트에게 상태를 바꾸라고 알려준다.
        closestLi.classList.contains('completed') ?
        changeTodoState(+index, VIEW) : changeTodoState(+index, COMPLETE);
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
        inputElem.value = '';
      }
    });

    this.$target.addEventListener('keyup', (e) => {
      const { target } = e;
      const { key } = e;
      const closestLi = target.closest('li');
      const index = closestLi.dataset['index'];
      if (key !== 'Enter' && key !== 'Escape') return
      closestLi.classList.remove("editing");
      closestLi.classList.add("view");
      if (key === 'Enter') {
        const value = e.target.value.trim();
        if (value) {
          changeTodoValue(+index, value);
        }
      }
    });
  }

  render = () => {
    this.$target.innerHTML = '';
    this.state.todos.map((item, index) => {
      if (this.state.selected !== ALL && item.state !== this.state.selected) {
        return;
      }  
      this.$target.insertAdjacentHTML(
        'beforeend',
        new TodoItem(item.state ===  VIEW ? VIEW : COMPLETE, item.value, index).template()
      );
    });
  };
}
