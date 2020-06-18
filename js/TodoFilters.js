import { ERRORTYPE,FILTERNAME } from './utils/constants.js';

export default class TodoFilters {
  constructor({ data, $target, $targetTodoList, onClickFilter }) {
    this.data = data;
    this.$target = $target;
    this.$targetTodoList = $targetTodoList;
    this.$target.addEventListener('click', (e) => {
      const $targetClassName = e.target.classList[0];
      if ($targetClassName === 'destroy-all') {
        onClickFilter('destroy-all');
        localStorage.removeItem('myTodo');
        return;
      }

      if (
        [FILTERNAME.ALL, FILTERNAME.ACTIVE, FILTERNAME.COMPLETED].includes(
          $targetClassName,
        )
      ) {
        const filterDOMList = this.$target.querySelectorAll('li a');
        filterDOMList.forEach((val) => {
          val.classList.remove('selected');
        });
        switch ($targetClassName) {
          case FILTERNAME.ALL:
            e.target.classList.add('selected');
            onClickFilter(FILTERNAME.ALL);
            break;
          case FILTERNAME.ACTIVE:
            e.target.classList.add('selected');
            onClickFilter(FILTERNAME.ACTIVE);
            break;
          case FILTERNAME.COMPLETED:
            e.target.classList.add('selected');
            onClickFilter(FILTERNAME.COMPLETED);
            break;
          default:
            console.error(ERRORTYPE.NOMATCHFILTER);
            break;
        }
      }
    });
  }
}
