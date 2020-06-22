import {
  ERROR_TYPE,
  FILTER_NAME,
  METHOD_NAME,
  STORAGE_NAME,
} from './utils/constants.js';
import * as functions from './utils/functions.js';

export default class TodoFilters {
  constructor({ data, $target, $targetTodoList, onClickFilter }) {
    this.data = data;
    this.$target = $target;
    this.$targetTodoList = $targetTodoList;
    this.$target.addEventListener('click', (e) => {
      const $targetClassName = e.target.classList[0];
      if ($targetClassName === 'destroy-all') {
        onClickFilter('destroy-all');
        functions.controlLocalStorage(STORAGE_NAME, METHOD_NAME.REMOVE);
        return;
      }

      if (
        [FILTER_NAME.ALL, FILTER_NAME.ACTIVE, FILTER_NAME.COMPLETED].includes(
          $targetClassName,
        )
      ) {
        const filterDOMList = this.$target.querySelectorAll('li a');
        filterDOMList.forEach((val) => {
          val.classList.remove('selected');
        });
        switch ($targetClassName) {
          case FILTER_NAME.ALL:
            e.target.classList.add('selected');
            onClickFilter(FILTER_NAME.ALL);
            break;
          case FILTER_NAME.ACTIVE:
            e.target.classList.add('selected');
            onClickFilter(FILTER_NAME.ACTIVE);
            break;
          case FILTER_NAME.COMPLETED:
            e.target.classList.add('selected');
            onClickFilter(FILTER_NAME.COMPLETED);
            break;
          default:
            console.error(ERROR_TYPE.NO_MATCH_FILTER);
            break;
        }
      }
    });
  }
}
