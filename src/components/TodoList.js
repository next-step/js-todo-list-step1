/* todoList를 보여주는 컴포넌트 */
export default function TodoList() {
  this.todoItems = [];
  this.$todoList = document.querySelector("#todo-list");

  this.setState = () => {
    this.todoItems = JSON.parse(localStorage.getItem("todoItems")) ?? [];
    this.render(this.todoItems);
  };

  this.render = (items) => {
    this.$todoList.innerHTML = ""; //원래 있었던 html을 전부 없앤 후에 다시 갱신한다
    const template = items.map(this.todoItemTemplate);
    this.$todoList.insertAdjacentHTML("beforeend", template);
  };

  //좀 더 손 봐야 할 것이다.
  this.todoItemTemplate = (item) => {
    return `<li id="${item.id}">
    					<div class="view">
      					<input class="toggle" type="checkbox" ${item.status}/>
      					<label class="label">${item.content}</label>
      					<button class="destroy"></button>
    					</div>
    					<input class="edit" value="새로운 타이틀" />
  					</li>`;
  };
}
