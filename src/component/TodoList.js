const getItemClass = (completed, isEditing) =>
  isEditing ? ' class="editing"' :
  completed ? ' class="completed"' :
  '';

export const TodoList = class {

  #target; #props;

  constructor(target, props = {}) {
    this.#target = target;
    this.#props = props;

    this.setEvent();
  }

  render (items, editingIndex, filterType) {
    this.#target.innerHTML = items.map(({ contents, completed }, index) =>
      (filterType === 'all') ||
      (filterType === 'active' && !completed) ||
      (filterType === 'completed' && completed) ? `
      <li ${ getItemClass(completed, editingIndex === index) }>
        <div class="view" data-index="${index}">
          <input class="toggle" type="checkbox" ${ completed ? ' checked' : '' }/>
          <label class="label">${contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" data-index="${index}"/>
      </li>` : '').join('');
  }

  setEvent () {

    const componentTarget = this.#target;
    const props = this.#props;

    componentTarget.addEventListener('change', ({ target }) => {
      if (target.classList.contains('toggle')) {
        const index = Number(target.parentNode.dataset.index);
        props.toggle(index);
      }
    });

    componentTarget.addEventListener('click', ({ target }) => {
      if (target.classList.contains('destroy')) {
        const index = Number(target.parentNode.dataset.index);
        props.remove(index);
      }
    });

    componentTarget.addEventListener('dblclick', ({ target }) => {
      if (target.classList.contains('label')) {
        const index = Number(target.parentNode.dataset.index);
        props.editing(index);
      }
    });

    componentTarget.addEventListener('keydown', ({ key, target }) => {
      if (target.classList.contains('edit') && key === 'Escape') {
        props.editing(-1);
      }
      if (target.classList.contains('edit') && key === 'Enter') {
        const index = Number(target.dataset.index);
        props.edited(index, target.value);
      }
    });
  }
}