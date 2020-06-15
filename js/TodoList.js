export default class TodoList {
  constructor({ data, $target, onRemove }) {
    (this.data = data), (this.$target = $target);
    this.$target.addEventListener('click', (e) => {
      if(e.target.className === "destroy"){
        onRemove(e.target.closest('.view').dataset.id)
      }
    })
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    const renderedHTML = this.data
      .map((todo) => {
        return `
      <li>
            <div class="view" data-id=${todo.id}>
              <input class="toggle" type="checkbox" />
              <label class="label">${todo.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value=${todo.text} />
          </li>
      `;
      })
      .join("");
    this.$target.innerHTML = renderedHTML;
  }
}
