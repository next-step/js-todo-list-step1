export default function TodoList(app) {
	this.$todoList = document.querySelector("#todo-list");
	this.todoItems = [];

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };

	const todoItemTemplate = (item) => {
    return `<li class=${item.status}>
    <div class="view">
      <input class="toggle" type="checkbox" ${item.status === "completed" ? "checked": ""}/>
      <label class="label">${item.text}</label>
      <button class="destroy"></button>
    </div>
    <input type="hidden" id="item-id" value="${item.id}"/>
    <input class="edit" value="${item.text}" />
  </li>`;
	};

	const onClick = event => {
		if (event.target.className === "destroy") {
			// 여기선 id만 추출하고 todoApp의 delete 함수에 인자로 넘기면서 호출
			const itemId = parseInt(event.target.closest("li").querySelector("#item-id").value);
			app.delete(itemId);
    }
	}

	this.$todoList.addEventListener("click", onClick);
}