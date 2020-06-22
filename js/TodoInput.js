import { KEY_NAME } from './utils/constants.js';

export default class TodoInput {
  constructor({ data, $target, $targetTodoFilters, onInput }) {
    this.data = data;
    this.$target = $target;
    this.$targetTodoFilters = $targetTodoFilters;

    this.$target.addEventListener('click', (e) => {
      e.target.value = '';
    });

    this.$target.addEventListener('keyup', (e) => {
      if (e.key === KEY_NAME.ENTER) {
        if (e.target.value) {
          const filterDOMList = this.$targetTodoFilters.querySelectorAll(
            'li a',
          );
          filterDOMList.forEach((val) => {
            if (val.classList.contains('all')) {
              val.classList.add('selected');
            } else {
              val.classList.remove('selected');
            }
          });
          onInput(e.target.value);
          e.target.value = '';
        }
      }
    });
  }
}
