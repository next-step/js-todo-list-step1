export class TodoItem {
  constructor(contents) {
    this.contents = this.templateTodoItem(contents);
    this.state;
    this.id;
    this.text;
  }

  setState(state) {
    return (this.state = state);
  }

  setId(id) {
    return (this.id = id);
  }

  setText(text) {
    return (this.text = text);
  }

  templateTodoItem = ({ contents, state, id }) => {
    this.setState(state);
    console.log("state ", state);
    this.setId(id);
    this.setText(contents);
    return `
    <li data-id=${id} class="${state === 'completed' ? 'completed' : ''}">
              <div class="view">
                <input class="toggle" type="checkbox" ${state === 'completed' ? 'checked' : ''}>
                <label class="label">${contents}</label>
                <button class="destroy"></button>
              </div>
                <input class="edit" value="${contents}" />
            </li>
      `;
  };
}
