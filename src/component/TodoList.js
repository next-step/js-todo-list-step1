const getItemClass = (completed, isEditing) =>
  isEditing ? ' class="editing"' :
  completed ? ' class="completed"' :
  '';

export const TodoList = class {

  target; props;

  constructor(target, props) {
    this.target = target;
    this.props = props;
  }

  render (items, editingIndex = -1) {
    this.target.innerHTML = items.map(({ contents, completed }, index) => `
      <li ${ getItemClass(completed, editingIndex === index) }>
        <div class="view">
          <input class="toggle" type="checkbox" ${ completed ? ' checked' : '' } />
          <label class="label">${contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>
    `)
  }
}