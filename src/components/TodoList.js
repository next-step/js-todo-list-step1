/* todoList를 보여주는 컴포넌트 */
export default function TodoList() {
  this.todoItems = [];

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    if (items[0]) {
      console.log(items[0].content, items[0].id);
    }
    if (items[1]) {
      console.log(items[1].content, items[1].id);
    }

    // const template = items.map(this.todoItemTemplate);
    // this.$todoList.innerHTML = template.join("");
  };

  this.todoItemTemplate = (items) => {
    return `<li>
    					<div class="view">
      					<input class="toggle" type="checkbox"/>
      					<label class="label">새로운 타이틀</label>
      					<button class="destroy"></button>
    					</div>
    					<input class="edit" value="새로운 타이틀" />
  					</li>`;
  };
}
