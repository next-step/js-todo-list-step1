/* todoList를 보여주는 컴포넌트 */
export default function TodoList() {
  this.todoItems = [];

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    // const template = items.map(this.todoItemTemplate);
    // this.$todoList.innerHTML = template.join("");
    console.log("list ", this.todoItems);
  };

  this.todoItemTemplate = (items) => {
    /* 여기서 html 추가해주는 로직이 들어가야 한다 */
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
