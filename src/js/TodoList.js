export default function TodoList({ $app, initialState }) {
  //렌더링할 DOM 생성

  this.state = initialState;

  this.$target = document.createElement('ul');
  this.$target.className = 'todo-list';
  this.$target.id = 'todo-list';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.$target.addEventListener('click', (e) => {});

  this.$target.addEventListener('click', (e) => {
    // const $toggleBox = e
    // console.log($toggleBox);
    console.log(e.target.className);
    console.log(e.target);
    // if ($toggleBox) {
    //   const { nodeId } = $toggleBox.dataset;
    //   console.log('nodeid', nodeId);
    //   const selectNode = this.state.nodes.find((node) => node.id === nodeId);

    //   if (selectNode) {
    //     this.onClick(selectNode);
    //   }
    // }
  });
  this.toggleTodo = (e) => {};

  this.render = () => {
    const todoTemplate = `${this.state
      .map(
        (todo, idx) =>
          `<li >
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${todo.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit " value=${todo.content}/>
        </li>`
      )
      .join('')}`;
    this.$target.innerHTML = todoTemplate;
  };
}
