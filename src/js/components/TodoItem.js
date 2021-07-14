export default TodoItem = ({ $app, content }) => {
  this.state = content;
  this.$target = document.createElement('li');
  $app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const todoItemTemplate = `
        <div class="view">
          <input class="toggle" type="checkbox"/>
          <label class="label">${this.state}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${this.state}/>
      `;

    this.$target.innerHTML = todoItemTemplate;
  };
};
