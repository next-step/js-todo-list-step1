import { KEYNAME, ERRORTYPE } from './utils/constants.js';
import * as templates from './utils/templates.js';
import * as funcs from './utils/funcs.js';

export default class TodoList {
  constructor({
    data,
    filteredData,
    filterType,
    $target,
    $targetTodoFilters,
    $targetTodoToggleAll,
    onToggle,
    onToggleAll,
    onRemove,
    onEdit,
  }) {
    this.data = data;
    this.filteredData = filteredData;
    this.filterType = filterType;
    this.$target = $target;
    this.$targetTodoFilters = $targetTodoFilters;
    this.$targetTodoToggleAll = $targetTodoToggleAll;

    this.$target.addEventListener('click', (e) => {
      const { className } = e.target;
      const { id } = e.target.closest('li').dataset;
      switch (className) {
        case 'toggle':
          onToggle(id);
          break;
        case 'destroy':
          onRemove(id);
          break;
        default:
          console.error(ERRORTYPE.NOMATCHCLASS);
          break;
      }
    });

    let toggleBoolean = true;
    this.$targetTodoToggleAll.addEventListener('click', (e) => {
      const { className } = e.target;
      if (className === 'toggle-all-label') {
        onToggleAll(toggleBoolean);
        toggleBoolean = !toggleBoolean;
      }
    });

    this.$target.addEventListener('dblclick', (e) => {
      const { className } = e.target;
      if (className === 'label') {
        const $targetLi = e.target.closest('li');
        $targetLi.className = 'editing';
        $targetLi.querySelector('.edit').focus();
      }
    });

    this.$target.addEventListener('keyup', (e) => {
      const { className } = e.target;
      if (className === 'edit') {
        const $targetLi = e.target.closest('li');
        if (e.key === KEYNAME.ESC) {
          if ($targetLi.querySelector('.toggle').checked) {
            $targetLi.className = 'completed';
          } else {
            $targetLi.className = '';
          }
        } else if (e.key === KEYNAME.ENTER && e.target.value !== '') {
          const id = $targetLi.dataset.id;
          const text = e.target.value;
          onEdit(id, text);
          if ($targetLi.querySelector('.toggle').checked) {
            $targetLi.className = 'completed';
          } else {
            $targetLi.className = '';
          }
        }
      }
    });
  }
  setState(nextData, nextFilterType) {
    this.data = nextData;
    this.filterType = nextFilterType;
    this.render();
  }
  render() {
    this.filteredData = funcs.filteringData(this.filterType, this.data);

    this.$target.innerHTML =
      this.filteredData && templates.TODOLIST(this.filteredData);
  }
}
